const mongoose = require ('mongoose')
const DB = process.env.DB


const username = process.env.USER
const password = process.env.PASSWORD

mongoose.connect(DB)