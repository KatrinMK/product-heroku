const jsonwebtoken = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        req.auth = jsonwebtoken.verify(req.headers.authorization, "secrets")
        console.log(req.auth)
        next()
    } catch(err) {
        res.status(200).json({
            message: "your token is invalid"
        })
    }

}
