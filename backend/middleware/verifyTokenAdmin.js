const verifyToken = require("./verifyToken")


const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) next()
    else return res.status(403).json('Not enough privileges to perform the following action.')
  })
}

module.exports = verifyTokenAdmin
