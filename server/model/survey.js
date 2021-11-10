const { MongoClient } = require("mongodb")
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()
const db = client.db('test')
var ObjectId = require('mongodb').ObjectId

class Model {
    static async read(req, res) {
        try {
            const surveys = db.collection("surveys")
            const survey = await surveys.find({}).toArray()
            return survey
        }
        catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async readId(req, res) {
        try {
            const surveys = db.collection("surveys")
            const id = { _id: ObjectId(req.params.id) }
            let survey = surveys.findOne(id)
            // console.log(survey, "<<<<<<<<<<surveyee")
            return survey
        }
        catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async create(req, res) {
        try {
            const surveys = db.collection("surveys")
            const data = await surveys.insertOne({
                surveyname: req.body.surveyname,
                email: req.body.email
            })
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

module.exports = Model