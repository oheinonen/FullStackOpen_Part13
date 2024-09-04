const router = require('express').Router()

const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll(
    {
      include: {
        model: Blog,
        attributes: { exclude: ['userId'] }
      }

    }
  )
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }))
      return res.status(400).json({ error: 'Validation error', details: validationErrors })
    }

    return res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } })
  if (user) {
    await user.update({ name: req.body.name })
    res.json(user)
  } else {
    res.status(404).end()
  }
})


module.exports = router


