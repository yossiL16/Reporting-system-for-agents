import jwt from 'jsonwebtoken';
import 'dotenv/config';


export function createToken(paylod){
    let token = jwt.sign(
        paylod, 
        process.env.SECRET,
        { expiresIn: "1h" }
    )
    return token
}

export function tokenExtractor(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null) return res.sendStatus(401)

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    });
        
}