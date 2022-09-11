const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token || req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
    if (error) return res.status(401).json('Invalid token.')
    req.user = user
    next()
  })

}

module.exports = verifyToken
