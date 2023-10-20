const mongoose = require('mongoose');

const assessment = new mongoose.Schema({
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
    assessment:{
        type: mongoose.SchemaTypes.Array,
        required: true,
    },
})

module.exports = mongoose.model('assessment', assessment)
