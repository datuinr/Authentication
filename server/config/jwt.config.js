const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
    try {
        jwt.verify(req.cookies.token, process.env.secret_key)
        next()
    } catch(e) {
        res.status(401).json({verified: false})
    }
}