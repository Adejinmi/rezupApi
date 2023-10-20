const Attendance = require('../src/database/schemas/attendance')
const savedattendance = require('../src/database/schemas/savedAttendance')

const saveattendance = async(req,res,next)=>{
    const { className, payload, details } = req.body
    await payload.forEach(async(element) => {
        try {
        const { name, matric, attendance} = element
        const key= Object.keys(attendance)[0]
        const att = await Attendance.findOne({$and: [{matric}, {className}]})     
        if (att) {
            const newattendance = att.attendance[0]
            newattendance[`${key}`]=attendance[`${key}`]
            await Attendance.updateOne({matric},{attendance:newattendance})
        } else {
            const newattendance = [attendance]
            await Attendance.create({ name, matric, className, attendance:newattendance})
        }
        } catch (error) {
            return res.sendStatus(500)
        }
        
    });
    try {
        const {date, present, absent} = details
        const savedd = await savedattendance.findOne({$and:[{className},{date}]})
        if (savedd) {
            await savedattendance.updateOne({className},{present, absent})
        } else {
            await savedattendance.create({ className, date, present, absent})
        }
    } catch (error) {
        return res.sendStatus(500)
    }
    next()
}

module.exports=saveattendance;