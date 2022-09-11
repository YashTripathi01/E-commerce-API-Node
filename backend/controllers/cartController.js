const Cart = require('../models/Cart')
const { addCartItemVal, updateCartItemVal } = require('../schemas/cart')


const addItem = async (req, res) => {
  try {
    const { error } = addCartItemVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    req.body.userId = req.user.id
    const newItem = new Cart(req.body)

    const savedItem = await newItem.save()
    return res.status(201).json(savedItem)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getAllItems = async (req, res) => {
  let items

  try {
    if (req.user.isAdmin === true) items = await Cart.find()
    else items = await Cart.find({ userId: req.user.id })

    if (!items) return res.status(404).json('Items not found')
    return res.status(200).json(items)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getItemById = async (req, res) => {
  let items

  try {
    if (req.user.isAdmin === true) items = await Cart.findOne({ _id: req.params.id })
    else items = await Cart.findOne({ _id: req.params.id, userId: req.user.id })

    if (!items) return res.status(404).json('Item not found.')
    return res.status(200).json(items)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const updateItem = async (req, res) => {
  let updatedItem

  try {
    const { error } = updateCartItemVal(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (req.user.isAdmin === true) {
      updatedItem = await Cart.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
      }, { new: true })

    } else {
      updatedItem = await Cart.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, {
        $set: req.body
      }, { new: true })
    }

    if (!updatedItem) return res.status(404).json('Item not found.')
    return res.status(200).json(updatedItem)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const deleteItem = async (req, res) => {
  let deletedItem

  try {
    if (req.user.isAdmin === true) deletedItem = await Cart.findOneAndDelete({ _id: req.params.id })
    else deletedItem = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id })

    if (!deletedItem) return res.status(404).json('Item not found.')
    return res.status(200).json('Item deleted successfully.')

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { addItem, getAllItems, getItemById, updateItem, deleteItem }
