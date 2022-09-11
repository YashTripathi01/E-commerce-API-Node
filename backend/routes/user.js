const router = require('express').Router()
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const userController = require('../controllers/userController')


router.use(verifyTokenAdmin)

// GET ALL USERS
router.route('/').get(userController.getAllUsers)

// GET USER BY ID
router.route('/:id').get(userController.getUserById)

// UPDATE USER BY ID
router.route('/:id').put(userController.updateUser)

// DELETE USER
router.route('/:id').delete(userController.deleteUser)

module.exports = router
