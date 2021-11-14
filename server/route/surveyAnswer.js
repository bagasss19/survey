const route = require('express').Router()
const Controller = require('../controller/surveyAnswer')
const {authentication} = require("../middleware/authentication")

route.post('/', Controller.create)
route.get('/public/read/:id', Controller.read)
route.use(authentication)
route.get('/', Controller.read)
route.get('/:id', Controller.readId)
route.put('/:id', Controller.update)
route.delete('/:id', Controller.delete)


module.exports = route