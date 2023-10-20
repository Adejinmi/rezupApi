const { Router }=require('express');
const router = Router()
const Assessment = require('../database/schemas/assessment')
const savedassessment = require('../database/schemas/savedAssessment')
const authorize = require('../middleware/authorize')

router.use(authorize)
router.post('',  async(req, res)=>{
    const { className, payload, maxScore } = req.body
    await payload.forEach(async(element) => {
        try {
        const { name, matric, assessment} = element
        const key= Object.keys(assessment)[0]
        const att = await Assessment.findOne({$and: [{matric}, {className}]})     
        if (att) {
            const newassessment = att.assessment[0]
            newassessment[`${key}`]=assessment[`${key}`]
             await Assessment.updateOne({matric},{assessment:newassessment})
        } else {
            const newassessment = [assessment]
            await Assessment.create({ name, matric, className, assessment:newassessment})
        }
        } catch (error) {
            return res.send(400)
        }        
    });

    try {
        const savedd = await savedassessment.findOne({className})
        const kkey= Object.keys(maxScore)[0]
        if (savedd) {
            const savass = savedd.maxScore[0]
            savass[`${kkey}`] = maxScore[`${kkey}`]
            await savedassessment.updateOne({className},{maxScore:savass})
        } else {
            let savass={}
            savass[`${kkey}`] = maxScore[`${kkey}`]
            await savedassessment.create({ className, maxScore:savass})
        }
    } catch (error) {
         return res.status(400).send(error)
    }

    res.status(201).send({msg:"Submitted"})
})

module.exports = router;