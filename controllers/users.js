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


router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }
    }
  })
  if (user) {
    res.json({
      username: user.username,
      name: user.name,
      readings: user.blogs.map(blog => ({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        year: blog.year,
        readinglists: {
          read: blog.readingList.read,
          id: blog.readingList.id,
        }
      }))
    })
  } else {
    res.status(404).end()
  }
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


