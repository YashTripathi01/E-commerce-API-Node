const mongoose = require('mongoose')

// PRODUCT SCHEMA
const Product = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: Array,
  },
  size: {
    type: String
  },
  color: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
}, { timestamps: true })

module.exports = mongoose.model('Product', Product)