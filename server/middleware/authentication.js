const {User} = require('../model')

function verifyToken(param) {
    return jwt.verify(param, "bagasganteng")
}

async function authentication(req,res,next) {
    try {
        let {token} = req.headers
        let decoded = verifyToken(token)
        
        const user = User.findOne({email : email})
        if (!user) throw {msg : "authentication failed", code : 401}
        req.userId = decoded._id
        next()
    } catch (err) {
        next(err)   
    }
}

async function custAuthentication(req,res,next) {
    try {
        let {token} = req.headers
        let decoded = verifyToken(token)
        
        let user = User.findOne({
            where : {
                email : decoded.email
            }
        })
        if (!user) throw {msg : "authentication failed", code : 401}
        req.userData = decoded.id
        next()
    } catch (err) {
        next(err)   
    }
}


module.exports = {authentication, custAuthentication}