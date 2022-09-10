const router = require('express').Router()
const User = require('../models/User')
const { encryptPassword } = require('../utils/password')
const verifyAuth = require('../middleware/verifyAuth')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')


// RESPONSE MODEL
const dataTrimmer = (details) => {
  let newDetails = []

  details.forEach(element => {
    let dict = {}
    dict._id = element._id
    dict.username = element.username
    dict.email = element.email
    dict.isAdmin = element.isAdmin
    dict.createdAt = element.createdAt
    dict.updatedAt = element.updatedAt

    newDetails.push(dict)
  });
  return newDetails
}


// GET ALL USERS
router.get('/', verifyTokenAdmin, async (req, res) => {
  let newDetails

  try {
    const query = req.query.new
    newDetails = query == 'true' ? dataTrimmer(await User.find().sort({ _id: -1 }).limit(1)) :
      await User.find({}).then((details, error) => {
        if (details) {
          newDetails = dataTrimmer(details)
          return res.status(200).json(newDetails)
        } else {
          return res.status(500).json(error);
        }
      })
    return res.status(200).json(newDetails)

  } catch (error) {
    return res.status(500).json(error)
  }
}
)


// GET USER BY ID
router.get('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, __v, ...others } = user._doc
    return res.status(200).json(others)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// UPDATE USER BY ID
router.put('/:id', verifyTokenAdmin, async (req, res) => {
  if (req.body.password) req.body.password = await encryptPassword(req.body.password)

  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    return res.status(201).json(updatedUser)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// DELETE USER
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json('User has been deleted')

  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
