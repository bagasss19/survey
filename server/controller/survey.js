const {SurveyModel} = require('../model/survey')

class Controller {
    static read (req,res) {
        SurveyModel.read(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static readId (req,res) {
        SurveyModel.readId(req,res)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static create(req,res) {
        SurveyModel.create(req,res)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static update(req,res) {
        SurveyModel.update(req,res)
        .then(data => {
            res.status(200).json(data.ops)
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }

    static delete(req,res) {
        SurveyModel.delete(req,res)
        .then(data => {
            res.status(200).json({msg : "successfully deleted"})
        })
        .catch(err => {
            res.status(400).json({ msg: `${err}` })
        })
    }
}

module.exports = Controller