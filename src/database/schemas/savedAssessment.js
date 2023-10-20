const mongoose = require('mongoose');

const savedassessment = new mongoose.Schema({
    className:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    maxScore:{
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
})

module.exports = mongoose.model('savedassessment', savedassessment)
