const router = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { encryptPassword, decryptPassword } = require('../utils/password')
const { registerVal, loginVal } = require('../schema/auth')


// REGISTER
router.post('/register', async (req, res) => {
  let admin = Boolean

  try {
    const { error } = registerVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) return res.status(400).send('User already exists!')

    if (req.body.isAdmin === true) admin = true
    else admin = false

    const hashedPassword = await encryptPassword(req.body.password)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      isAdmin: admin
    })

    const savedUser = await newUser.save()
    const { password, __v, ...others } = savedUser._doc

    return res.status(201).json(others)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { error } = loginVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    console.log('1');
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(404).send('User not found!')

    const validPassword = await decryptPassword(req.body.password, user.password)

    if (!validPassword) return res.status(401).json('Invalid Credentials.')

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })

    const { password, __v, ...others } = user._doc

    return res.status(200).json({ ...others, accessToken })

  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
