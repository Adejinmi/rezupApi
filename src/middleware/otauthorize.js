const jwt = require('jsonwebtoken')
const Newclass = require('../database/schemas/class')
const privateKey = process.env.SECRETKEY

const otauthorize = async (req,res,next)=>{
    const { token } = req.body
        try {
            const data = jwt.verify(token, privateKey)
            const { className } = data
            const auth = await Newclass.findOne({className})
            if(auth){
                req.body.className=auth.className
            }
            else{
                return res.sendStatus(400)
            } 
        } catch (error) {
            return res.sendStatus(400)
        }
        
    next()
}

module.exports=otauthorize;