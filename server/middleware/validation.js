export function bodyInsertionTest(req,res,next) {
    const {agentCode , password } = req.body;
    if(!agentCode || !password) {return res.status(400).json({error: "MISSING_FIELDS"})};
    if(typeof agentCode !== "string" || typeof password !== "string"){return res.status(400).json({error:"The type is incorrect."})}
    next()
};

export function bodyInsertFormData(req,res,next){
    const {category, urgency, message} = req.body;
    if(!category || !urgency || !message) {return res.status(400).json({error: "MISSING_FIELDS"})};
    if(typeof category !== "string" || typeof urgency !== "string" || typeof message !== "string"){return res.status(400).json({error:"The type is incorrect."})}
    const {role} = req.user;
    console.log(role);
    
    if(role !== 'admin' && role !== 'agent'){return res.status(401).json({message:"No entry permit"})} 
    next()
}

export function valideFromCsv(req,res,next) {
    const {role} = req.user;
    if(role !== 'admin' && role !== 'agent'){return res.status(401).json({message:"No entry permit"})} 

}