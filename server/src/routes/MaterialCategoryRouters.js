const express = require('express')
const router = express.Router()
const MaterialCategory = require('../models/materialCategoryModel')

// GET /material-categories 获取所有物料分类
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, name } = req.query
  const skip = (page - 1) * limit
  const query = name ? { name: { $regex: name, $options: 'i' } } : {}
  try {
    const categories = await MaterialCategory.find(query).skip(skip).limit(limit)
    const count = await MaterialCategory.countDocuments(query)
    res.json({ code: 200, data: categories, count })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// GET /material-categories/:id 获取指定物料分类
router.get('/:id', async (req, res) => {
  try {
    const category = await MaterialCategory.findById(req.params.id)

    if (!category) {
      return res.json({ code: 404, message: 'Material category not found' })
    }

    res.json({ code: 200, data: category })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// POST /material-categories 创建物料分类
router.post('/', async (req, res) => {
  const category = new MaterialCategory(req.body)
  try {
    const newCategory = await category.save()
    res.json({ code: 200, data: newCategory })
  } catch (err) {
    res.json({ code: 400, message: err.message })
  }
})
// PUT /material-categories/:id 更新物料分类
router.put('/:id', async (req, res) => {
  try {
    const category = await MaterialCategory.findById(req.params.id)

    if (!category) {
      return res.json({ code: 404, message: 'Material category not found' })
    }
    category.name = req.body.name
    const updatedCategory = await category.save()
    res.json({ code: 200, data: updatedCategory })
  } catch (err) {
    res.json({ code: 400, message: err.message })
  }
})

// DELETE /material-categories/:id 删除物料分类
router.delete('/:id', async (req, res) => {
  try {
    const result = await MaterialCategory.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0) {
      return res.json({ code: 404, message: 'Material category not found' })
    }

    res.json({ code: 200, message: 'Material category deleted' })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 导出路由
module.exports = router
