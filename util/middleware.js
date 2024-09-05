const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const { User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
    }
  }
  next()
}
const authChecker = async (req, res, next) => {
  if (!req.decodedToken) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const user = await User.findByPk(req.decodedToken.id)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  req.user = user
  next()
}

module.exports = {
  tokenExtractor,
  authChecker
}