/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const TagModel = require('../models/tagModel')

// 获取所有标签
router.get('/', async (req, res) => {
  try {
    const tags = await TagModel.find()
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// 获取单个标签
router.get('/:id', getTag, (req, res) => {
  res.status(200).json(res.tag)
})

// 创建标签
router.post('/', async (req, res) => {
  const tag = new TagModel({
    name: req.body.name
  })

  try {
    const newTag = await tag.save()
    res.status(200).json(newTag)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// 更新标签
router.patch('/:id', getTag, async (req, res) => {
  if (req.body.name != null) {
    res.tag.name = req.body.name
  }

  try {
    const updatedTag = await res.tag.save()
    res.status(200).json(updatedTag)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// 删除标签
router.delete('/:id', getTag, async (req, res) => {
  try {
    await res.tag.remove()
    res.status(200).json({ message: 'Tag deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// 获取标签中间件
async function getTag(req, res, next) {
  let tag
  try {
    tag = await TagModel.findById(req.params.id)
    if (tag == null) {
      return res.status(404).json({ message: 'Cannot find tag' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.tag = tag
  next()
}

module.exports = router
