const router = require('express').Router()
const Product = require('../models/Product')
const verifyToken = require('../middleware/verifyToken')
const verifyTokenAdmin = require('../middleware/verifyTokenAdmin')


// ADD A PRODUCT
router.post('/', verifyTokenAdmin, async (req, res) => {
  const newProduct = new Product(req.body)

  try {
    const savedProduct = await newProduct.save()
    return res.status(201).json(savedProduct)

  } catch (error) {
    return res.status(500).json(error)
  }

})


// GET ALL PRODUCTS
router.get('/', verifyToken, async (req, res) => {
  let products

  try {
    const qNew = req.query.new
    const qCategory = req.query.category

    if (qNew == 'true') {
      products = await Product.find().sort({ createdAt: -1 }).limit(1)
    } else if (qCategory) {
      products = await Product.find({
        category: {
          $in: [qCategory]
        }
      })
    } else {
      products = await Product.find()
    }

    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json(error)
  }
}
)


// GET PRODUCT BY PRODUCT ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    return res.status(200).json(product)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// UPDATE PRODUCT
router.put('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })
    return res.status(201).json(updatedProduct)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// DELETE PRODUCT
router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    return res.status(200).json('Product has been deleted')

  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router