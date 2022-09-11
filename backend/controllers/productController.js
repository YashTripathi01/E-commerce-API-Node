const Product = require('../models/Product')
const { addProductVal, updateProductVal } = require('../schemas/product')


const addProduct = async (req, res) => {
  try {
    const { error } = addProductVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const newProduct = new Product(req.body)
    const savedProduct = await newProduct.save()

    return res.status(201).json(savedProduct)

  } catch (error) {
    return res.status(500).json(error)
  }

}


const getAllProducts = async (req, res) => {
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

    if (!products) return res.status(404).json('Products not found.')
    return res.status(200).json(products)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json('Product not found.')
    return res.status(200).json(product)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const updateProduct = async (req, res) => {
  try {
    const { error } = updateProductVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true })

    if (!updatedProduct) return res.status(404).json('Product not found.')
    return res.status(201).json(updatedProduct)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if (!deletedProduct) return res.status(404).json('Product not found.')
    return res.status(200).json('Product has been deleted.')

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct }