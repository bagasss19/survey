const { MongoClient } = require("mongodb")
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()
const bcrypt = require('bcrypt')
const db = client.db('test')
var ObjectId = require('mongodb').ObjectId
const jwt = require('jsonwebtoken')

class Model {
    static async login(req, res) {
        try {
            const { email, password } = req.body
            const users = db.collection("users")
            let user = await users.findOne({email : email})
            if (!email || !password) return {msg: "password or email cannot be empty!", code: 400 }
            if (!user) return {msg: "invalid email or password!", code: 400 }
            let checkPass = bcrypt.compareSync(password, user.password)
            if (!checkPass) return {msg: "invalid email or password!", code: 400 }
            let param = {
                id: user._id,
                email: user.email
            }
            let token = jwt.sign(param, "bagasganteng")
            console.log(token, "<<<<?")
            return token
        } catch (err) {
            return err
        }
    }

    static async read(req, res) {
        try {
            const users = db.collection("users")
            const user = await users.find({}).toArray()
            return user
        }
        catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async readId(req, res) {
        try {
            const users = db.collection("users")
            const id = { _id: ObjectId(req.params.id) }
            let user = users.findOne(id)
            // console.log(user, "<<<<<<<<<<useree")
            return user
        }
        catch (err) {
            return err
            // console.log(err, 'masuk di eror!!!!!!!')
        }
    }

    static async create(req, res) {
        try {
            const users = db.collection("users")
            const data = await users.insertOne({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            return data
        } catch (err) {
            return err
        }
    }

    static async update(req, res) {
        try {
            const users = db.collection("users")
            const user = { _id: ObjectId(req.params.id) }
            const data = {
                title: req.body.title,
                overview: req.body.overview,
                poster_path: req.body.poster_path,
                popularity: req.body.popularity,
                tags: req.body.tags
            }

            const result = await users.replaceOne(user, data)
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
            const users = db.collection("users")
            const user = { _id: ObjectId(req.params.id) }

            const result = await users.deleteOne(user)
            // console.log(req.params.id, "<<<<<<<PARAAMSSS")
        }

        catch (err) {
            console.log(err, 'masuk di eror!!!!!!!')
            return err
        }
    }
}

module.exports = Model