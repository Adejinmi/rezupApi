const { Router }=require('express');
const router = Router()
const authorize = require('../middleware/authorize')
const createdclasses= require('../database/schemas/class')
const bcrypt = require('bcryptjs')
const privateKey = process.env.SECRETKEY
const jwt = require('jsonwebtoken')


router.post('', authorize, async(req,res)=>{
    const { className, newPassword } = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(newPassword, salt)
        const resp = await createdclasses.updateOne({className}, {password})
        const ress = await createdclasses.findOne({className}) 
        var token = jwt.sign({ password: ress.password, className }, privateKey, { algorithm: 'RS256' });
        res.status(201).send({token})
    } catch (error) {
        res.sendStatus(500)
    }
})

module.exports = router;