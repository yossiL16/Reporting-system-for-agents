import express from 'express';
import fs from 'fs/promises';
import { tokenExtractor } from '../utils/jwt.js';
import { bodyInsertFormData, valideFromCsv } from '../middleware/validation.js';
import multer from 'multer'
import loadData from '../utils/readeFileCsv.js';
import getReportByRole from '../utils/serchReport.js';



const reportsRouter = express();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = ["image/png", "image/jpg", "image/jpeg"];

  if (allowedExtensions.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({storage, fileFilter});

reportsRouter.post('/', tokenExtractor, upload.single("image"), bodyInsertFormData, async (req, res) => {
    try{
        const file = req.file;
        if((file.size / 1024) > 600) return res.status(413).json({message:"The file is too heavy"})
        
        const jsonData = await fs.readFile("./DB/reports.json", 'utf8');
        const data = await JSON.parse(jsonData) 

        const {category, urgency, message} = req.body;
        const id = (data.reports?.length || 0) + 1;
        const agentId = req.user.id
        const report = {
            id,
            agentId,
            category,
            urgency,
            message,
            imagePath: file ? file.path : "",
            sourceType: "manual",
            date: new Date().toISOString()
        }
        data.reports.push(report)
        await fs.writeFile("./DB/reports.json", JSON.stringify(data))
        res.status(201).json({report})
    } catch(err) {
        res.status(500).json({err})
        console.log(err);
    }
})



const storageCsv = multer.diskStorage({
    destination: function (req,file,cd) {
        return cd(null, "./uploads")
    },
    filename: function (req,file,cd) {
        cd(null, file.originalname)
    }
})

const uploadCsv = multer({storage: storageCsv})

reportsRouter.post("/csv", tokenExtractor ,uploadCsv.single('file'), valideFromCsv, async (req,res) => {
    if(!req.file){return res.status(400).json({message: "FILE_NOT_SENT"})}
    try {
        const path = `./uploads/${req.file.filename}`
        const dataCsv = await loadData(path)
        const title = dataCsv[0]
        if((!("category" in title)) || (!('urgency' in title)) || (!('message' in title))) {
            return res.status(400).json({message: "CSV_FILE_ISINVALID"})
        }

        const jsonData = await fs.readFile("./DB/reports.json", 'utf8');
        const data = await JSON.parse(jsonData)
        const id = (data.reports?.length || 0) + 1;
        const agentId = req.user.id

        for(let p of dataCsv) {
            const report = {
            id,
            agentId,
            category: p.category,
            urgency: p.urgency,
            message: p.message,
            imagePath: p.path,
            sourceType: "csvFile",
            date: new Date().toISOString()
        }
        data.reports.push(report)
        await fs.writeFile("./DB/reports.json", JSON.stringify(data))
        }
        res.status(201).json({
            reports: dataCsv,
            importedCount: dataCsv.length
        })
        
    } catch(e){
        console.error({error: e.message});
    }
})


reportsRouter.get('/', tokenExtractor, async (req,res) => {

    try {
    const querys = req.query;
    const {role, id} = req.user;

    const jsonData = await fs.readFile("./DB/reports.json", 'utf8');
    const data = JSON.parse(jsonData);
    const listData = data.reports

    const serchReport = await getReportByRole(listData, role, id, querys)
    if(serchReport.length === 0) {
        return res.status(200).json({reports: []})
    }
    res.status(200).json({reports: serchReport})
    } catch(e) {
        console.log(e.message);
    }
})


reportsRouter.get('/:id', tokenExtractor, async (req,res) => {
    try{
        const {id} = req.params;
        const jsonData = await fs.readFile("./DB/reports.json", 'utf8');
        const data = await JSON.parse(jsonData);
        const listData = data.reports
        const report = listData.filter(report => Number(report.id) === Number(id))
        if(report.length === 0) {return res.status(404).jsom({message: "The report does not exist"})}
        res.status(200).json({report: report[0]})
    } catch(e){
        console.log(e.message);
        
    }
})

export default reportsRouter