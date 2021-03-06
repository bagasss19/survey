const {Model} = require('../model/user')

class Controller {
    static login (req,res) {
        Model.login(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static read (req,res) {
        Model.read(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static readId (req,res) {
        Model.readId(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static create(req,res) {
        Model.create(req,res)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static update(req,res) {
        Model.update(req,res)
        .then(data => {
            res.status(200).json(data.ops)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static delete(req,res) {
        Model.delete(req,res)
        .then(data => {
            res.status(200).json({msg : "successfully deleted"})
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }
}

module.exports = Controller