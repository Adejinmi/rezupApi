const mongoose = require('mongoose');

const attendance = new mongoose.Schema({
    name:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    matric:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    className:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    attendance:{
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
})

module.exports = mongoose.model('attendance', attendance)
