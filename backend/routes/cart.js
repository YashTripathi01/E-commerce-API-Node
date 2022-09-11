const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const verifyAuth = require('../middleware/verifyAuth')
const cartController = require('../controllers/cartController')


router.use(verifyToken)

// ADD ITEM TO CART
router.route('/').post(cartController.addItem)

router.use(verifyAuth)

// GET ALL CART ITEMS OF A USER
router.route('/').get(cartController.getAllItems)

// GET CART ITEM BY CART ID OF A USER
router.route('/:id').get(cartController.getItemById)

// UPDATE CART ITEM
router.route('/:id').put(cartController.updateItem)

// DELETE CART ITEM
router.route('/:id').delete(cartController.deleteItem)

module.exports = router
