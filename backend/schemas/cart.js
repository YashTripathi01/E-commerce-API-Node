const Joi = require('joi')


// ADD ITEM TO CART
const addCartItemVal = (data) => {
  const addCartItemValSchema = Joi.object({
    userId: Joi.string().alphanum().trim(true),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().alphanum().trim(true).required(),
      quantity: Joi.number().required()
    })).required()
  })

  return addCartItemValSchema.validate(data)
}


// UPDATE ITEM IN CART
const updateCartItemVal = (data) => {
  const updateCartItemValSchema = Joi.object({
    userId: Joi.string().alphanum().trim(true),
    products: Joi.array().items(Joi.object({
      productId: Joi.string().alphanum().trim(true),
      quantity: Joi.number()
    })).required()
  })

  return updateCartItemValSchema.validate(data)
}

module.exports = { addCartItemVal, updateCartItemVal }