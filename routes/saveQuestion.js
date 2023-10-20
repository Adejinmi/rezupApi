const { Router }=require('express');
const router = Router()
const Question = require('../src/database/schemas/question')
const authorize = require('../middleware/authorize')

router.use(authorize)
router.post('',  async(req, res)=>{
    const { className, unit, question, options, correctOption } = req.body
        try {
        const att = await Question.findOne({$and: [{className}, {question}]})     
        if (att) {
             await Question.updateOne({$and: [{className}, {question}]},{question, options, correctoption:correctOption})
        } else {
            await Question.create({ className, unit, question, options, correctoption:correctOption})
        }
        } catch (error) {
            res.send(400)
        }        

    res.status(201).send({msg:"Submitted"})
})

module.exports = router;