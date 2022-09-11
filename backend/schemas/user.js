const Joi = require('joi')


// UPDATE USER
const updateUserVal = (data) => {
  const updateUserValSchema = Joi.object({
    username: Joi.string().alphanum().min(2).max(25).trim(true),
    email: Joi.string().email().trim(true),
    password: Joi.string().min(4).trim(true),
    isAdmin: Joi.boolean()
  })

  return updateUserValSchema.validate(data)
}

module.exports = { updateUserVal }