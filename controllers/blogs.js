const { Op } = require('sequelize')
const router = require('express').Router()
const { Blog, User } = require('../models')
const { authChecker, tokenExtractor } = require('../util/middleware')

const blogFinder = async (req, res, next) => {
  const blog = await Blog.findByPk(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  req.blog = blog
  next()
}


router.get('/', async (req, res) => {
  const where = {}
  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }
    ]
  }

  const blogs = await Blog.findAll({
    order: [
      ['likes', 'DESC']
    ],
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
    },
    where
  })

  res.json(blogs)
})

router.post('/', tokenExtractor, authChecker, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id })
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

router.delete('/:id', blogFinder, tokenExtractor, authChecker, async (req, res) => {
  if (req.blog.userId !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' })
  }
  await req.blog.destroy()
  res.status(204).end()
})

module.exports = router
