const mongoose = require('mongoose');

const savedexam = new mongoose.Schema({
    className:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    exam:{
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
})

module.exports = mongoose.model('savedexam', savedexam)
