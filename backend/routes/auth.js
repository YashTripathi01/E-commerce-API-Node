const router = require('express').Router()
const authController = require('../controllers/authController')


// REGISTER
router.route('/register').post(authController.registerNewUser)

// LOGIN
router.route('/login').post(authController.userLogin)

module.exports = router
