const User = require('../models/User')
const dataTrimmer = require('../utils/dataTrimmer')
const { encryptPassword } = require('../utils/password')
const { updateUserVal } = require('../schemas/user')


const getAllUsers = async (req, res) => {
  let newDetails

  try {
    const query = req.query.new

    // newDetails = query == 'true' ? dataTrimmer(await User.find().sort({ _id: -1 }).limit(2)) :
    //   dataTrimmer(await User.find())
    newDetails = query == 'true' ? await User.find().sort({ _id: -1 }).limit(2).select('-password -__v') :
      await User.find().select('-password -__v')

    if (!newDetails) return res.status(404).json('Users not found.')
    return res.status(200).json(newDetails)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -__v')

    if (!user) return res.status(404).json('User not found.')

    // const { password, __v, ...others } = user._doc
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const updateUser = async (req, res) => {
  try {
    const { error } = updateUserVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (req.body.password) req.body.password = await encryptPassword(req.body.password)

    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true }).select('-password -__v')

    if (!updatedUser) return res.status(404).json('User not found.')
    return res.status(201).json(updatedUser)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if (!deletedUser) return res.status(404).json('User not found.')
    return res.status(200).json('User has been deleted')

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser }