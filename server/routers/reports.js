import express from 'express';
import { tokenExtractor } from '../utils/jwt.js';
import { bodyInsertFormData } from '../middleware/validation.js';
import data from '../DB/report.json' with { type: "json" };

const reportsRouter = express();

reportsRouter.post('/', tokenExtractor, bodyInsertFormData, (req, res) => {
    try{
        const date = new Date().toLocaleDateString()
        const {category, urgency, message} = req.body;
        


        res.status(201).json()
    }
})

export default reportsRouter