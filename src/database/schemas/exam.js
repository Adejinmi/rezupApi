const mongoose = require('mongoose');

const exam = new mongoose.Schema({
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
    exam:{
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
})

module.exports = mongoose.model('exam', exam)
