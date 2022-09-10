const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)


// STRIPE PAYMENT
router.post('/payment', (req, res) => {
  stripe.charges.create({
    source: req.body.tokenId,
    amount: req.body.amount,
    currency: 'INR'
  }, (error, response) => {
    if (error) return res.status(500).json(error)
    else return res.status(200).json(response)
  })
})

module.exports = router
