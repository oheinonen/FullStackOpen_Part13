const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const { Session, User } = require('../models')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7)
      req.decodedToken = jwt.verify(token, SECRET)
      req.token = token
    } catch (error) {
      console.log(error)
    }
  }
  next()
}
const authChecker = async (req, res, next) => {
  const session = await Session.findOne({
    where: {
      token: req.token,
    }
  })

  if (!session) {
    return res.status(401).json({ error: 'Token missing or invalid' })
  }

  const user = await User.findByPk(session.userId)
  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  if (user.isDisabled) {
    return res.status(401).json({ error: 'User is disabled' })
  }
  req.user = user
  next()
}

module.exports = {
  tokenExtractor,
  authChecker
}