const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    const deletedBlog = await req.blog.destroy()
    if (deletedBlog) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Blog not found' })
    }
  } else {
    res.status(404).json({ error: 'Blog not found' })
  }
})


module.exports = router


