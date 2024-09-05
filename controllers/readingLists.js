const router = require('express').Router()

const { ReadingList } = require('../models')

router.post('/', async (req, res) => {
  if (!req.body.blog_id || !req.body.user_id) {
    return res.status(400).json({ error: 'blog_id and user_id fields are required' })
  }
  try {

    const readingList = await ReadingList.create({ blogId: req.body.blog_id, userId: req.body.user_id })
    res.json(readingList)
  }
  catch (err) {
    console.log('err', err)
  }
})


module.exports = router
