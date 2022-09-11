const Order = require('../models/Order')
const { addOrderVal, updateOrderVal } = require('../schemas/order')


const addOrder = async (req, res) => {
  try {
    const { error } = addOrderVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    req.body.userId = req.user.id
    const newOrder = new Order(req.body)

    const savedOrder = await newOrder.save()
    return res.status(201).json(savedOrder)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getAllOrders = async (req, res) => {
  let orders

  try {
    if (req.user.isAdmin === true) orders = await Order.find()
    else orders = await Order.find({ userId: req.user.id })

    if (!orders) return res.status(404).json('Orders not found')
    return res.status(200).json(orders)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getOrderById = async (req, res) => {
  let orders

  try {
    if (req.user.isAdmin === true) orders = await Order.findOne({ _id: req.params.id })
    else orders = await Order.findOne({ _id: req.params.id, userId: req.user.id })

    if (!orders) return res.status(404).json('Order not found.')
    return res.status(200).json(orders)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const updateOrder = async (req, res) => {
  let updatedOrder

  try {
    const { error } = updateOrderVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (req.user.isAdmin === true) {
      updatedOrder = await Order.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
      }, { new: true })

    } else {
      updatedOrder = await Order.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, {
        $set: req.body
      }, { new: true })
    }

    if (!updatedOrder) return res.status(404).json('Order not found.')
    return res.status(200).json(updatedOrder)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const deleteOrder = async (req, res) => {
  let deletedOrder

  try {
    if (req.user.isAdmin === true) deletedOrder = await Order.findOneAndDelete({ _id: req.params.id })
    else deletedOrder = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user.id })

    if (!deletedOrder) return res.status(404).json('Order not found.')
    return res.status(200).json('Order deleted successfully.')

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder }