const jwt = require('jsonwebtoken')
const secretkey = process.env.SECRETKEY
const createdclasses= require('../database/schemas/class')

const authorize= async (req, res, next)=>{
    const token = req.body.password
    try {
        const data = jwt.verify(token, secretkey)
        const { className, password } = data
        const auth = await createdclasses.findOne({$and: [{className}, {password}]})
        if (auth) {
            req.body.className=auth.className
            req.body.unit=auth.unit
            next() 
        } else {
            res.send(400)
        }
        
    } catch (error) {
        res.send(400)
    }
      
}

module.exports=authorize

