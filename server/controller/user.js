const User = require('../model/user')

class Controller {
    static login (req,res) {
        User.login(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static read (req,res) {
        User.read(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static readId (req,res) {
        User.readId(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static create(req,res) {
        User.create(req,res)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static update(req,res) {
        User.update(req,res)
        .then(data => {
            res.status(200).json(data.ops)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static delete(req,res) {
        User.delete(req,res)
        .then(data => {
            res.status(200).json({msg : "successfully deleted"})
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }
}

module.exports = Controller