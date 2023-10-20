const mongoose = require('mongoose');

const savedattendance = new mongoose.Schema({
    className:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    present:{
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    absent:{
        type: mongoose.SchemaTypes.Number,
        required: true,
    }
    
})

module.exports = mongoose.model('savedattendance', savedattendance)
