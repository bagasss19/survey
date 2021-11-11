const route = require('express').Router()
const Controller = require('../controller/survey')
const {authentication} = require("../middleware/authentication")

route.use(authentication)
route.get('/', Controller.read)
route.post('/', Controller.create)
route.get('/:id', Controller.readId)
route.put('/:id', Controller.update)
route.delete('/:id', Controller.delete)


module.exports = route