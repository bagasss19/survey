const jwt = require('jsonwebtoken')
const { MongoClient } = require("mongodb")
const url = 'mongodb://localhost:27017/'
const client = new MongoClient(url, { useUnifiedTopology: true })
client.connect()
const db = client.db('test')


function verifyToken(param) {
    return jwt.verify(param, "bagasganteng")
}

async function authentication(req, res, next) {
    try {
        let { token } = req.headers
        let decoded = verifyToken(token)

        const users = db.collection("users")
        let user = await users.findOne({ email: decoded.email })
        if (!user) throw { msg: "authentication failed", code: 401 }
        req.userId = decoded.id
        next()
    } catch (err) {
        next(err)
    }
}



module.exports = { authentication }