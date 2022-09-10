const Joi = require('joi')


// REGISTER
const registerVal = (data) => {
  const registerValSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(25).trim(true).required(),
    email: Joi.string().email().trim(true).required(),
    password: Joi.string().min(4).trim(true).required(),
    isAdmin: Joi.boolean()
  })

  return registerValSchema.validate(data)
}


// LOGIN
const loginVal = (data) => {
  const loginValSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(25).trim(true).required(),
    password: Joi.string().min(4).trim(true).required()
  })

  return loginValSchema.validate(data)
}

module.exports = { registerVal, loginVal }