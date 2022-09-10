const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) res.status(401).json('Invalid credentials.')
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('Invalid token.')
  }

}

module.exports = verifyToken
