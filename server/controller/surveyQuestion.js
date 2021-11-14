const {surveyQuestion, surveyModel} = require('../model/survey')

const createSurveyQuestion = function (id, body) {
    return surveyQuestion.create(body)
    .then(data => {
        console.log(data, "<<????????")
        return surveyModel.findByIdAndUpdate(
            id,
            { $push: { question: data._id } },
            { new: true, useFindAndModify: false }
        );
    })
    .catch(err => {
        console.log(err, "<<<<<ERRORR")
        return err
    })
}

class Controller {
    static async read(req, res) {
        try {
            let survey = await surveyQuestion.find().populate("answer").populate("survey_id")
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({msg : err})
        }
    }

    static async readId(req, res) {
        try {
            let survey = await surveyQuestion.find({ survey_id: req.params.id }).exec();
            console.log(survey, "<<??")
            res.status(200).json(survey)
        }
        catch (err) {
            res.status(400).json({msg : err})
        }
    }

    static async create(req, res) {
        try {
            req.body.survey_id = req.params.id
            const data = await createSurveyQuestion(req.params.id, req.body)
            res.status(200).json(data)
        } catch (err) {
            console.log(err, "<<<?")
            res.status(400).json({msg : err})
        }
    }

    static async update(req, res) {
        try {
            const result = await surveyQuestion.findByIdAndUpdate(id, body)
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
            const result = await surveyQuestion.findByIdAndRemove(req.params.id)
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