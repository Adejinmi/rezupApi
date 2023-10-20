const mongoose = require('mongoose');

const question = new mongoose.Schema({
    className:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    unit:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    question:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    options:{
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
    correctoption:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
})

module.exports = mongoose.model('question', question)
