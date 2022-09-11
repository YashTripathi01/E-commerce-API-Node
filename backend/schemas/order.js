const Joi = require('joi')


// ADD ITEM TO CART
const addOrderVal = (data) => {
  const addOrderValSchema = Joi.object({
    userId: Joi.string().alphanum().trim(true),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().alphanum().trim(true).required(),
      quantity: Joi.number().required()
    })).required(),
    amount: Joi.number().required(),
    address: Joi.string().alphanum().min(10).max(255).trim(true).required(),
    status: Joi.string().trim(true)
  })

  return addOrderValSchema.validate(data)
}


// UPDATE ITEM IN CART
const updateOrderVal = (data) => {
  const updateOrderValSchema = Joi.object({
    userId: Joi.string().alphanum().trim(true),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().alphanum().trim(true),
      quantity: Joi.number()
    })),
    amount: Joi.number(),
    address: Joi.string().alphanum().min(10).max(255).trim(true),
    status: Joi.string().trim(true)
  })

  return updateOrderValSchema.validate(data)
}

module.exports = { addOrderVal, updateOrderVal }