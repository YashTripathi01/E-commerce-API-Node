const verifyToken = require("./verifyToken")


const verifyAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin || req.user) next()
    else return res.status(403).json('Not enough privileges to perform the following action.')
  })
}

module.exports = verifyAuth
