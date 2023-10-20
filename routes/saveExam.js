const { Router }=require('express');
const router = Router()
const Exam = require('../src/database/schemas/exam')
const savedexam = require('../src/database/schemas/savedexam')
const authorize = require('../middleware/authorize')

router.use(authorize)
router.post('',  async(req, res)=>{
    const { className, payload, maxScore } = req.body
    await payload.forEach(async(element) => {
        try {
        const { name, matric, exam} = element
        const key= Object.keys(exam)[0]
        const att = await Exam.findOne({$and: [{matric}, {className}]})     
        if (att) {
            const newexam = att.exam[0]
            newexam[`${key}`]=exam[`${key}`]
             await Exam.updateOne({matric},{exam:newexam})
        } else {
            const newexam = [exam]
            await Exam.create({ name, matric, className, exam:newexam})
        }
        } catch (error) {
            res.send(400)
        }        
    });

    try {
        const savedd = await savedexam.findOne({className})
        const kkey= Object.keys(maxScore)[0]
        if (savedd) {
            const savass = savedd.exam[0]
            savass[`${kkey}`] = maxScore[`${kkey}`]
            await savedexam.updateOne({className},{exam:savass})
        } else {
            const savass=[maxScore]
            await savedexam.create({ className, exam:savass})
        }
    } catch (error) {
        res.status(400).send(error)
    }

    res.status(201).send({msg:"Submitted"})
})

module.exports = router;