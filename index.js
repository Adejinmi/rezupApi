require('dotenv').config()
const express = require('express');
const app = express();
require('./database');
app.use(express.json());
const createClass = require('./routes/createClass')
const saveAttendance = require('./routes/saveAttendance')
const saveAssessment = require('./routes/saveAssessment')
const saveExam = require('./routes/saveExam')
const saveQuestion = require ('./routes/saveQuestion')
const ota = require('./routes/ota')
const retrieveClass = require('./routes/retrieveClass')
const changePassword = require('./routes/changePassword')

app.listen(3000)

app.use('/api/createClass', createClass);
app.use('/api/saveAttendance', saveAttendance)
app.use('/api/saveAssessment', saveAssessment)

app.use('/api/saveQuestion', saveQuestion)
app.use('/api/ota', ota)
app.use('/api/retrieveClass', retrieveClass)
app.use('/api/changePassword', changePassword)