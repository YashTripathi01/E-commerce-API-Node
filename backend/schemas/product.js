const Joi = require('joi')


// ADD PRODUCT
const addProductVal = (data) => {
  const addProductValSchema = Joi.object({
    title: Joi.string().alphanum().trim(true).required(),
    description: Joi.string().alphanum().trim(true).required(),
    image: Joi.string().alphanum().trim(true).required(),
    category: Joi.array().items(Joi.string().trim(true)).required(),
    size: Joi.string().alphanum().trim(true).required(),
    color: Joi.string().trim(true).required(),
    price: Joi.number().required()
  })

  return addProductValSchema.validate(data)
}


// UPDATE PRODUCT
const updateProductVal = (data) => {
  const updateProductValSchema = Joi.object({
    title: Joi.string().alphanum().trim(true),
    description: Joi.string().alphanum().trim(true),
    image: Joi.string().alphanum().trim(true),
    category: Joi.array().items(Joi.string().trim(true)),
    size: Joi.string().alphanum().trim(true),
    color: Joi.string().trim(true),
    price: Joi.number()
  })

  return updateProductValSchema.validate(data)
}

module.exports = { addProductVal, updateProductVal }