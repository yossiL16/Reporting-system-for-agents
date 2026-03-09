import express from 'express';
import fs from 'fs/promises';
import { tokenExtractor } from '../utils/jwt.js';
import { bodyInsertFormData, valideFromCsv } from '../middleware/validation.js';
import multer from 'multer'
import path from 'path'


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
        if (!file) {
            return res.status(400).send("No file uploaded or file type not allowed");
        }
        if((file.size / 1024) > 600) return res.status(413).json({message:"The file is too heavy"})
        
        const jsonData = await fs.readFile("./DB/reports.json", 'utf8');
        const data = await JSON.parse(jsonData) 

        const date = new Date().toLocaleDateString()
        const {category, urgency, message} = req.body;
        const id = (data.reports?.length || 0) + 1;
        const agentId = req.user.id
        const report = {
            id,
            agentId,
            category,
            urgency,
            message,
            imagePath: file.path,
            sourceType: "manual",
            date
        }
        data.reports.push(report)
        await fs.writeFile("./DB/reports.json", JSON.stringify(data))
        res.status(201).json({report})
    } catch(err) {
        res.status(500).json({err})
        console.log(err);
    }
})



const uploadCsv = multer({ dest: 'uploads/' })

reportsRouter.post("/csv", uploadCsv.single('file'), valideFromCsv, async (req,res) => {
    
    
})

export default reportsRouter