const express = require('express')
const router = express.Router()
const MaterialCategory = require('../models/materialCategoryModel')

// GET /material-categories 获取所有物料分类
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query
  const skip = (page - 1) * limit
  console.log(req.query)
  try {
    const categories = await MaterialCategory.find(query).skip(skip).limit(limit)
    const count = await MaterialCategory.countDocuments(query)
    const totalPages = Math.ceil(count / limit)
    console.log(categories)

    res.status(200).json({ code: 200, data: categories, page, totalPages })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

// GET /material-categories/:id 获取指定物料分类
router.get('/:id', async (req, res) => {
  try {
    const category = await MaterialCategory.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ code: 404, message: 'Material category not found' })
    }

    res.status(200).json({ code: 200, data: category })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// POST /material-categories 创建物料分类
router.post('/', async (req, res) => {
  const category = new MaterialCategory({
    content: req.body.content,
    createdBy: req.body.createdBy
  })

  try {
    const newCategory = await category.save()
    res.status(201).json({ code: 201, data: newCategory })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// PUT /material-categories/:id 更新物料分类
router.put('/:id', async (req, res) => {
  try {
    const category = await MaterialCategory.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ code: 404, message: 'Material category not found' })
    }

    category.content = req.body.content
    category.createdBy = req.body.createdBy

    const updatedCategory = await category.save()
    res.status(200).json({ code: 200, data: updatedCategory })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// DELETE /material-categories/:id 删除物料分类
router.delete('/:id', async (req, res) => {
  try {
    const category = await MaterialCategory.findById(req.params.id)

    if (!category) {
      return res.status(404).json({ code: 404, message: 'Material category not found' })
    }

    await category.remove()
    res.status(200).json({ code: 200, message: 'Material category deleted' })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// 导出路由
module.exports = router
