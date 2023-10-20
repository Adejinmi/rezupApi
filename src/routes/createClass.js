const { Router }=require('express');
const router = Router()
const Newclass = require('../database/schemas/class')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const privateKey = process.env.SECRETKEY


router.post('', async (req, res)=>{
    const { unit, instrument, level, instructor } = req.body
    const className = `${instrument.trim()}_${level.trim()}_${instructor.trim().replaceAll(" ","_").replaceAll(",","_")}`
    const salt = await bcrypt.genSalt(10)
    console.log(req.body.password)
    const password = await bcrypt.hash(req.body.pass, salt)
    const check = await Newclass.findOne({className})
    if (check) {
        res.status(400).send({msg:"Class Exists"})        
    } else {
        const resp = await Newclass.create({ className, instructor, instrument, unit, password, level })
        var token = jwt.sign({ password: resp.password, className }, privateKey, { algorithm: 'RS256' });
        const payload = {
            className:resp.className,
            instructor:resp.instructor,
            instrument:resp.instrument,
            level: resp.level,
            unit:resp.unit,
            password:token
        } 
        res.status(201).send({payload});
    }

})

module.exports = router;