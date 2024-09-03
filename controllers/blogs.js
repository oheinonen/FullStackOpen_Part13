const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')

const router = require('express').Router()

const { Blog, User } = require('../models')

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  req.blog = blog
  next()
}


const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Missing token' })
  }
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  if (!req.body.likes) {
    return res.status(400).json({ error: 'Likes field is required' })
  }
  req.blog.likes = req.body.likes
  const updatedBlog = await req.blog.save()
  res.json(updatedBlog)
})

router.delete('/:id', blogFinder, async (req, res) => {
  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
