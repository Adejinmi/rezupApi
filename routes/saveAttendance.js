const { Router }=require('express');
const router = Router()
const Attendance = require('../src/database/schemas/attendance')
const authorize = require('../middleware/authorize')
const saveattendance = require('../middleware/saveattendance')

router.use(authorize)
router.post('',  saveattendance, async(req, res)=>{

    res.status(201).send({msg:"Submitted"})
})

module.exports = router;