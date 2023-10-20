const Newclass = require('../database/schemas/class')

const allclass = async(req, res, next)=>{
    const createdClasses = await Newclass.find({})
    const allClasses=[]
    createdClasses.forEach(element => {
        allClasses.push(element.className)
    });
    res.status(200).send({allClasses})  
    next()
}

module.exports = allclass;