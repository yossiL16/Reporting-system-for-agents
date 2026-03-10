import express from 'express';
import { tokenExtractor } from '../utils/jwt.js';
import { hashPassword } from '../utils/security.js';
import atbash from '../utils/atbash.js';
import fs from 'fs/promises';
import { validationInAdmin } from '../middleware/validation.js';


const adminRouter = express();

adminRouter.post('/', tokenExtractor, validationInAdmin, async (req,res)=> {
    const {role} = req.user;
    if(role !== "admin"){return res.status(403).json({message: "The user is not an admin"})} 
    try {
        const {agentCode, fullName, role} = req.body;

        const reversName = atbash(fullName);
        const hashPass = hashPassword(reversName);

        const jsonData = await fs.readFile("./DB/agents.json", 'utf8');
        const data = await JSON.parse(jsonData)
        const listAgents = data.agents;
        
        const result = listAgents.filter(agent => agent.agentCode === agentCode)
        if(result.length > 0) {return res.status(409).json({nessage: "The agent already exists"})}
        const id = (listAgents.length) + 1
        
        const newAgent = {
            id,
            agentCode,
            fullName,
            passwordHash:hashPass,
            role,
            createdAt: new Date().toLocaleDateString()
        }
        data.agents.push(newAgent)
        await fs.writeFile("./DB/agents.json", JSON.stringify(data))

        return res.status(201).json({user:{id, agentCode, fullName, role, initialPasswordHint :"like revers name"}})

    } catch(e){
        console.log(e.message);
    }
})


adminRouter.get('/',tokenExtractor,async (req, res) => {
    const {role} = req.user;
    if(role !== "admin"){return res.status(403).json({message: "The user is not an admin"})}
    try{
        const jsonData = await fs.readFile("./DB/agents.json", 'utf8');
        const data = await JSON.parse(jsonData)
        res.status(200).json({users: data.agents})
    } catch(e){
        console.log(e.message);
    }
})

export default adminRouter