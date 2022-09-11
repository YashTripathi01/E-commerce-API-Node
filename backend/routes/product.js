const router = require('express').Router()
const verifyToken = require('../middleware/verifyToken')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')
const productController = require('../controllers/productController')


router.use(verifyToken)

// GET ALL PRODUCTS
router.route('/').get(productController.getAllProducts)

// GET PRODUCT BY PRODUCT ID
router.route('/:id').get(productController.getProductById)

router.use(verifyTokenAdmin)

// ADD A PRODUCT
router.route('/').post(productController.addProduct)

// UPDATE PRODUCT
router.route('/:id').put(productController.updateProduct)

// DELETE PRODUCT
router.route('/:id').delete(productController.deleteProduct)

module.exports = router