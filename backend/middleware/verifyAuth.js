const verifyToken = require("./verifyToken")


const verifyAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) next()
    else return res.status(403).json('Not enough privileges to perform the following action.')
  })
}

module.exports = verifyAuth
