const {surveyAnswer, surveyQuestopn} = require('../model/survey')

const createsurveyAnswer = function (id, body) {
    return surveyAnswer.create(body)
    .then(data => {
        return surveyQuestopn.findByIdAndUpdate(
            id,
            { $push: { answer: data._id } },
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
            let survey = await surveyAnswer.find()
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
        console.log("ASHUUPP")
        try {
            req.body.user = req.userId
            req.body.answer = []
            const data = await createsurveyAnswer(req.params.id, req.body)
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