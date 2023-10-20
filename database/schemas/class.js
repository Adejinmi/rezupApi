const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    className:{
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    instructor:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    instrument:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    unit:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    password:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    level:{
        type: mongoose.SchemaTypes.String,
        required: true,
    }
})

module.exports = mongoose.model('createdclasse', classSchema)
