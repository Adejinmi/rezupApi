const mongoose = require ('mongoose')
const DB = process.env.DB


mongoose.connect(`${DB}`)
.then(()=>{})
.catch((err)=>{console.log(DB)})