const { Router }=require('express');
const router = Router()
const Attendance = require('../../database/schemas/attendance')

router.get('/getStudents', async(req,res)=>{
    
    try{
        const data = await Attendance.find({})
        res.send({data})
    }
    catch(error){
        res.send({error})
    }

})

module.exports=router;