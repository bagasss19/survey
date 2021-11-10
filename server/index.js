const express = require('express')
const app = express()
const user = require('./route/user')
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/user', user)


app.listen(PORT, () => {
    console.log(`jalan di ${PORT}`)
})