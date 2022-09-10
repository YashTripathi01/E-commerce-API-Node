const router = require('express').Router()
const Cart = require('../models/Cart')
const verifyToken = require('../middleware/verifyToken')


// ADD ITEM TO CART
router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.userId = req.user.id
    const newCart = new Cart(req.body)
    const savedCart = await newCart.save()
    return res.status(201).json(savedCart)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// GET ALL CART ITEMS OF A USER
router.get('/', verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id })
    return res.status(200).json(cartItems)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// GET CART ITEM BY CART ID OF A USER
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.findOne({ userId: req.user.id, _id: req.params.id })
    if (cartItems) return res.status(200).json(cartItems)
    else return res.status(403).json('Not enough privileges to perform the following action.')

  } catch (error) {
    return res.status(500).json(error)
  }
})


// UPDATE CART ITEM
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedCartItem = await Cart.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, {
      $set: req.body
    }, { new: true })

    if (updatedCartItem != null) return res.status(200).json(updatedCartItem)
    else return res.status(403).json('Not enough privileges to perform the following action.')

  } catch (error) {
    return res.status(500).json(error)
  }
})


// DELETE CART ITEM
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedCartItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id })

    if (deletedCartItem != null) return res.status(200).json('Order deleted successfully')
    else return res.status(403).json('Not enough privileges to perform the following action.')

  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
