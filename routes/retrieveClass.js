const { Router }=require('express');
const router = Router()
const Attendance = require('../src/database/schemas/attendance')
const allclass = require('../middleware/allclass')
const otauthenticate = require('../middleware/otauthenticate')
const Newclass = require('../src/database/schemas/class')
const Assessment = require('../src/database/schemas/assessment')
const savedassessment = require('../src/database/schemas/savedAssessment')
const savedattendance = require('../src/database/schemas/savedAttendance')
const savedexam = require('../src/database/schemas/savedexam')
const Exam = require('../src/database/schemas/exam')
const Question = require('../src/database/schemas/question')
const jwt = require('jsonwebtoken')
const privateKey = process.env.SECRETKEY


router.get('/getClasses', allclass)

router.post('', otauthenticate, async(req,res)=>{
    const { className } = req.body
    try {
        const studs = await Attendance.find({className})
        const attTaken = await savedattendance.find({className})
        const studAss = await Assessment.find({className})
        const assTaken = await savedassessment.findOne({className})
        const studEx = await Exam.find({className})
        const que = await Question.find({className})
        const exTaken = await savedexam.findOne({className})
        const classDetails = await Newclass.findOne({className})
            const nominalroll=[]
            const allAtt=[]
            const allAss = []
            const allAttTak = []
            const allEx = []
            const allQue = []
            const assTak = []
            const exTak= exTaken.exam[0]
            studs.forEach(element => {
                const { name, matric } = element
                nominalroll.push({name,matric})
            });
            studs.forEach(element => {
                const { name, matric, attendance } = element
                const att = JSON.stringify(attendance[0])
                allAtt.push({name,matric,att})
            });
            attTaken.forEach(element => {
                const { date, present, absent } = element
                const attT = JSON.stringify({date,present,absent})
                allAttTak.push(attT)
            });
            assTaken.maxScore.forEach(element => {
                const attT = JSON.stringify(element)
                assTak.push(attT)
            });
            studAss.forEach(element => {
                const { name, matric, assessment } = element
                const ass = JSON.stringify(assessment[0])
                allAss.push({name,matric,ass})
            });
            studEx.forEach(element => {
                const { name, matric, exam } = element
                const ex = JSON.stringify(exam[0])
                allEx.push({name,matric,ex})
            });
            que.forEach(element => {
                const { question, options, correctoption } = element
                const opt = JSON.stringify(options[0])
                allQue.push({question,opt,correctoption})
            });
        const token = jwt.sign({ password: classDetails.password, className }, privateKey, { algorithm: 'RS256' });
        const { unit, instrument, instructor, level } = classDetails 
        const details = {className, instrument, instructor, unit, level, token}
        res.send({details, nominalroll, allAtt, allAttTak, allAss, assTak, allEx, exTak, allQue})
        
    } catch (error) {
        res.status(500).send('Try Again')
    }
})

module.exports = router;