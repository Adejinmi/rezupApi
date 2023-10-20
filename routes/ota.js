const { Router }=require('express');
const router = Router()
const authorize = require('../middleware/authorize')
const Attendance = require('../database/schemas/attendance')
const allclass = require('../middleware/allclass')
const otauthenticate = require('../middleware/otauthenticate')
const otauthroize = require ('../middleware/otauthorize')
const saveattendance=require('../middleware/saveattendance')


router.get('/getClasses', allclass)

router.post('/takeAttendance', otauthenticate, async(req,res)=>{
    const { token, className } = req.body
    try {
        const students = await Attendance.find({className})
        const studs=[]
        students.forEach(element => {
            const { name, matric }=element 
            studs.push({name, matric})
        });
        res.send({token, studs})
        
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post('/saveAttendance',otauthroize, saveattendance, async(req,res)=>{
    res.status(201).send({msg:"Submitted"})
})
module.exports = router;