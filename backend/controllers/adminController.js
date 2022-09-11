const Order = require('../models/Order')
const User = require('../models/User')


const getUserStats = async (req, res) => {
  const date = new Date()
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' }
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 }
        }
      }
    ])
    if (!data) return res.status(404).json('Not found.')
    return res.status(200).json(data)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    if (!orders) return res.status(404).json('No orders found.')
    return res.status(200).json(orders)

  } catch (error) {
    return res.status(500).json(error)
  }
}


const getIncomeGenerated = async (req, res) => {
  const date = new Date()
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount'
        }
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' }
        }
      }
    ])
    if (!income) return res.status(404).json('Not found.')
    return res.status(200).json(income)

  } catch (error) {
    return res.status(500).json(error)
  }
}

module.exports = { getUserStats, getAllOrders, getIncomeGenerated }