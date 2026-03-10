import express from "express";
import cors from 'cors'
import 'dotenv/config'
import authRouter from "./routers/auth.js";
import reportsRouter from "./routers/reports.js";
import adminRouter from "./routers/admin.js";



const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT 

app.use('/auth', authRouter)
app.use('/reports', reportsRouter)
app.use('/admin/users', adminRouter)

app.get('/', (req,res) => {
    res.send("hello from router")
    console.log("hello from router");
    
    
})


app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})