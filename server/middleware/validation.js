export function bodyInsertionTest(req,res,next) {
    const {agentCode , password } = req.body;
    if(!agentCode || agentCode === undefined || !password || password === undefined) {return res.status(400).json({error: "MISSING_FIELDS"})};
    if(typeof agentCode !== "string" || typeof password !== "string"){return res.status(400).json({error:"The type is incorrect."})}
    next()
};

export function bodyInsertFormData(req,res,next){
    const {category, urgency, message} = req.body;
    if(!category || !urgency || !message ||
        category === undefined || urgency === undefined || message === undefined
    ) {return res.status(400).json({error: "MISSING_FIELDS"})};
    if(typeof category !== "string" || typeof urgency !== "string" || typeof message !== "string"){return res.status(400).json({error:"The type is incorrect."})}
    next()
}