const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Newclass = require('../src/database/schemas/class')
const privateKey = process.env.SECRETKEY

const otauthenticate = async (req,res,next)=>{
    const { className, password } = req.body
    try {
        const classDetails = await Newclass.findOne({className})
        try {
            const auth = await bcrypt.compare(password, classDetails.password)
            if(auth){
                const token = jwt.sign({ className }, privateKey, { algorithm: 'RS256' });
                req.body.token=token
            }
            else{
                return res.sendStatus(400)
            }
        } catch (error) {
            return res.sendStatus(400)
        }
        
        
        
    } catch (error) {
        return res.sendStatus(500)
    }
    next()
}

module.exports=otauthenticate;