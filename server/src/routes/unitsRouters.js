/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const UnitModel = require('../models/unitModel')

// GET /units
// GET /units
// GET /units
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, name } = req.query
  const skip = (page - 1) * limit
  const query = name ? { name: { $regex: name, $options: 'i' } } : {}
  try {
    const units = await UnitModel.find(query).skip(skip).limit(limit)
    const count = await UnitModel.countDocuments(query)
    res.json({ code: 200, data: units, count })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// GET /units/:id
router.get('/:id', getUnit, (req, res) => {
  res.status(200).json({ code: 200, data: res.unit }) // 返回查询结果
})

// POST /units
router.post('/', async (req, res) => {
  const unit = new UnitModel({
    name: req.body.name, // 获取请求参数中的 content 字段
    createdBy: req.body.createdBy // 获取请求参数中的 createdBy 字段
  })
  try {
    const newUnit = await unit.save() // 创建新的单位
    res.status(200).json({ code: 200, data: newUnit }) // 返回创建结果
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message }) // 返回错误信息
  }
})

// DELETE /units/:id
router.delete('/:id', getUnit, async (req, res) => {
  try {
    await UnitModel.deleteOne({ _id: req.params.id }) // 删除指定的单位
    res.status(200).json({ code: 200, message: 'Unit deleted' }) // 返回删除成功信息
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }
})
// PUT /units/:id
router.put('/:id', getUnit, async (req, res) => {
  try {
    const { name, description } = req.body
    if (name != null) {
      res.unit.name = name
    }
    if (description != null) {
      res.unit.description = description
    }
    await res.unit.save()
    res.status(200).json({ code: 200, message: 'Unit updated' })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})
// 定义 getUnit 中间件函数，用于查询指定的单位
async function getUnit(req, res, next) {
  let unit
  try {
    unit = await UnitModel.findById(req.params.id)
    if (unit == null) {
      return res.status(404).json({ code: 404, message: 'Unit not found' })
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message })
  }

  res.unit = unit
  next()
}

module.exports = router
