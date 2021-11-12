const express = require('express')
const app = express()
const user = require('./route/user')
const survey = require('./route/survey')
const surveyquestion = require('./route/surveyQuestion')
const surveyanswer = require('./route/surveyAnswer')
const PORT = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', user)
app.use('/survey', survey)
app.use('/surveyquestion', surveyquestion)
app.use('/surveyanswer', surveyanswer)

app.listen(PORT, () => {
    console.log(`jalan di ${PORT}`)
})