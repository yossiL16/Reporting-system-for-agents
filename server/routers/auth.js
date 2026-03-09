import express from 'express';
import { createToken, tokenExtractor} from '../utils/jwt.js';
import data from '../DB/agents.json'  with { type: "json" };
import { bodyInsertionTest } from '../middleware/validation.js';
import { verifyPassword } from '../utils/security.js';

const agents = data.agents

const authRouter = express();

authRouter.post('/login', bodyInsertionTest, (req,res) => {
    try{
    const {agentCode, password} = req.body;
    
    const agent = agents.find(ag => ag.agentCode === agentCode);
    if(!agent){
        return res.status(401).json({ message: "Incorrect login details" });
    }
    const kode = verifyPassword(password, agent.passwordHash)

    if(!kode) return res.status(401).json({message: "Incorrect login details"})

    const token = createToken(agent)
    res.status(200).json({token, user:{id:agent.id,
         agentCode: agent.agentCode,
          fullName: agent.fullName,
           role: agent.role
        }})

    } catch(err) {
        console.log(err);
        res.status(500).json({err})  
    }
 })


 authRouter.get('/me', tokenExtractor, (req,res) => {
    try{
        const {id,agentCode, fullName, role } = req.user;  
        res.status(200).json({ user: { id, agentCode, fullName, role }})
    } catch(err){    
        console.log(err);
        res.status(500).json({err})
    }
 })


 export default authRouter