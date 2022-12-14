const router = require('express').Router()
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const adminController = require('../controllers/adminController')


router.use(verifyTokenAdmin)

// GET USER STATS (total no. of users per month)
router.route('/stats').get(adminController.getUserStats)

// GET ALL ORDERS (order of all the users)
router.route('/orders').get(adminController.getAllOrders)

// GET INCOME GENERATED BY ALL ORDERS
router.route('/income').get(adminController.getIncomeGenerated)

module.exports = router
