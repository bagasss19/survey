const route = require('express').Router()
const Controller = require('../controller/user')

route.post('/login', Controller.login)
route.get('/', Controller.read)
route.post('/', Controller.create)
route.get('/:id', Controller.readId)
route.put('/:id', Controller.update)
route.delete('/:id', Controller.delete)


module.exports = route