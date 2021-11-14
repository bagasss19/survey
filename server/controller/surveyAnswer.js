const {surveyAnswer} = require('../model/survey')

class Controller {
    static async read(req, res) {
        try {
            let survey = await surveyAnswer.find({respond_id : req.params.id})
            console.log(survey, "<<<????")
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({msg : err})
        }
    }

    static async admin(req, res) {
        try {
            let survey = await surveyAnswer.find({survey_id : req.params.id})
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({msg : err})
        }
    }
    static async readId(req, res) {
        try {
            let survey = await surveyAnswer.findById(req.params.id)
            console.log(survey, "<<??")
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({msg : err})
        }
    }

    static async create(req, res) {
        try {
            console.log(req.body.body, "<<<?")
            const data = await surveyAnswer.create(req.body.body)
            res.status(200).json(data)
        } catch (err) {
            console.log(err, "<<<?")
            res.status(400).json({msg : err})
        }
    }

    static async update(req, res) {
        try {
            const result = await surveyAnswer.findByIdAndUpdate(id, body)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            res.status(200).json(result)
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            res.status(400).json({msg : err})
        }
    }

    static async delete(req, res) {
        try {
            const result = await surveyAnswer.findByIdAndRemove(id, body)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            res.status(200).json({msg : "sukses"})
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            res.status(400).json({msg : err})
        }
    }
}

module.exports = Controller