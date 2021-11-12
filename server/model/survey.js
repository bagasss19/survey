const { MongoClient } = require("mongodb")
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()
const db = client.db('test')
var ObjectId = require('mongodb').ObjectId
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test');
const {userModel} = require("./user")

const surveyModel = mongoose.model(
    "surveys",
    new mongoose.Schema({
        title : String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        },
        question: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "surveyQuestion"
        }]
    })
)

const surveyQuestion = mongoose.model(
    "surveyQuestion",
    new mongoose.Schema({
        type: Number,
        survey_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "surveys"
        },
        title: String,
        answer: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "surveyAnswer"
        }]
    })
)

const surveyAnswer = mongoose.model(
    "surveyAnswer",
    new mongoose.Schema({
        survey_question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "surveyQuestion"
        },
        title: String,
    })
)

const createSurvey = function (userId, body) {
    return surveyModel.create(body)
    .then(data => {
        console.log(data, "<<????????")
        return userModel.findByIdAndUpdate(
            userId,
            { $push: { survey: data._id } },
            { new: true, useFindAndModify: false }
        );
    })
    .catch(err => {
        console.log(err, "<<<<<ERRORR")
        return err
    })
}

class SurveyModel {
    static async read(req, res) {
        try {
            let survey = await surveyModel.find().populate("question")
            return survey
        }
        catch (err) {
            console.log(err, "<?")
            return err
        }
    }

    static async readId(req, res) {
        try {
            let survey = await surveyModel.findById(req.params.id).populate("question")
            return survey
        }
        catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async create(req, res) {
        try {
            req.body.user = req.userId
            req.body.question =[]
            const data = await createSurvey(req.userId, req.body)
            console.log("sukses")
            return data
        } catch (err) {
            return err
        }
    }

    static async update(req, res) {
        try {
            const surveys = db.collection("surveys")
            const survey = { _id: ObjectId(req.params.id) }
            const data = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }

            const result = await surveys.replaceOne(survey, data)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
            return result
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }

    static async delete(req, res) {
        try {
            const surveys = db.collection("surveys")
            const survey = { _id: ObjectId(req.params.id) }

            const result = await surveys.deleteOne(survey)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }
}

module.exports = {SurveyModel, surveyQuestion, surveyModel, surveyAnswer}