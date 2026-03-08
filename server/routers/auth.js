import express from 'express';
import { createToken, tokenExtractor} from '../utils/jwt';
import { hashPassword, verifyPassword } from '../utils/security';
import data from '../DB/agents.json'  with { type: "json" };

const agents = data.agents

const authRouter = express();

authRouter.post('/login', (res,req) => {
    try{
    const {agentCode, password} = req.body;

    if(agentCode === null || password === undefined) {
        return res.statusCode(400).json({err: 'invalid agentCode or password'});
    }

    const agent = agents.find(ag => ag.agentCode === agentCode && ag.password === password);

    if(!agent) return res.status(401).json({message: "Incorrect login details"})

    const token = createToken(agent)
    res.statusCode(200).json({token, user:{id:agent.id,
         agentCode: agent.agentCode,
          fullName: agent.fullName,
           role: agent.role
        }})

    } catch(err) {
        console.log(err);
        res.status(500).json({err})  
    }
 })


 authRouter.get('me', tokenExtractor, (req,res) => {
    try{
        const {id,agentCode, fullName, role } = req.user;
        res.status(200).json({ user: { id, agentCode, fullName, role }})
    } catch(err){
        res.status(500).json({err})
    }
 })
 

 export default authRouter