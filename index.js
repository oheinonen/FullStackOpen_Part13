require('dotenv').config()
const express = require('express')
const { Blog } = require('./models/blog')

const app = express()
app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  console.log(req.body)
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const id = req.params.id
  const deletedBlog = await Blog.destroy({
    where: { id: id }
  })
  if (deletedBlog) {
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'Blog not found' })
  }
})
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)

})

module.exports = app;
