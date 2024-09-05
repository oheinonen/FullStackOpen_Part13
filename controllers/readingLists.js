const router = require('express').Router()

const { ReadingList } = require('../models')
const { authChecker, tokenExtractor } = require('../util/middleware')

router.post('/', tokenExtractor, authChecker, async (req, res) => {
  if (!req.body.blog_id || !req.body.user_id) {
    return res.status(400).json({ error: 'blog_id and user_id fields are required' })
  }
  if (req.user.id != req.body.user_id) {
    return res.status(403).json({ error: 'Unauthorized: You can only add blog to your own reading list' })
  }

  try {

    const readingList = await ReadingList.create({ blogId: req.body.blog_id, userId: req.body.user_id })
    res.json(readingList)
  }
  catch (err) {
    console.log('err', err)
  }
})

router.put('/:id', tokenExtractor, authChecker, async (req, res) => {
  if (!req.body.read) {
    return res.status(400).json({ error: 'read field is required required' })
  }
  const readingList = await ReadingList.findByPk(req.params.id)
  if (readingList.userId != req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  try {
    const updatedReadingList = await readingList.update({ read: req.body.read })
    res.json(updatedReadingList)
  }
  catch (err) {
    console.log('err', err)
  }
})

module.exports = router
