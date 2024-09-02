const router = require('express').Router()

const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  req.blog = blog
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
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
