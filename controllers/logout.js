
const router = require('express').Router()
const { Session } = require('../models')
const { tokenExtractor, authChecker } = require('../util/middleware')

router.delete('/', tokenExtractor, authChecker, async (req, res) => {
  try {
    await Session.destroy({
      where: {
        userId: req.user.id
      }
    })
    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})


module.exports = router


