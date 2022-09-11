const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const verifyAuth = require('../middleware/verifyAuth')
const orderController = require('../controllers/orderController')


router.use(verifyToken)

// ADD/CREATE ORDERS
router.route('/').post(orderController.addOrder)

router.use(verifyAuth)

// GET ALL ORDERS OF A USER
router.route('/').get(orderController.getAllOrders)

// GET ORDER BY ORDER ID
router.route('/:id').get(orderController.getOrderById)

// UPDATE ORDER
router.route('/:id').put(orderController.updateOrder)

// DELETE ORDER
router.route('/:id').delete(orderController.deleteOrder)

module.exports = router
