const bcrypt = require('bcryptjs')

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  return hashedPassword
}

const decryptPassword = async (password, hashedPassword) => {
  const validPassword = await bcrypt.compare(password, hashedPassword)

  return validPassword
}

module.exports = { encryptPassword, decryptPassword }