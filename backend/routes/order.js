const router = require('express').Router()
const Order = require('../models/Order')
const verifyToken = require('../middleware/verifyToken')


// ADD/CREATE ORDERS
router.post('/', verifyToken, async (req, res) => {
  try {
    req.body.userId = req.user.id
    const newOrder = new Order(req.body)

    const savedOrder = await newOrder.save()
    return res.status(201).json(savedOrder)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// GET ALL ORDERS OF A USER
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
    return res.status(200).json(orders)

  } catch (error) {
    return res.status(500).json(error)
  }
})


// GET ORDER BY ORDER ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.user.id, _id: req.params.id })

    if (orders) return res.status(200).json(orders)
    else return res.status(403).json('Not enough privileges to perform the following action.')

  } catch (error) {
    return res.status(500).json(error)
  }
})


// UPDATE ORDER
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, {
      $set: req.body
    }, { new: true })

    if (updatedOrder != null) return res.status(200).json(updatedOrder)
    else return res.status(403).json('Not enough privileges to perform the following action.')


  } catch (error) {
    return res.status(500).json(error)
  }
})


// DELETE ORDER
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user.id })

    if (deletedOrder != null) return res.status(200).json('Order deleted successfully')
    else return res.status(403).json('Not enough privileges to perform the following action.')

  } catch (error) {
    return res.status(500).json(error)
  }
})

module.exports = router
