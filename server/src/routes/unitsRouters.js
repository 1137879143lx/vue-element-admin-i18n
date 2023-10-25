/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const UnitModel = require('../models/unitModel')

// GET /units
router.get('/', async (req, res) => {
  try {
    const units = await UnitModel.find() // 查询所有单位
    res.status(200).json({ code: 200, data: units }) // 返回查询结果
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }
})

// GET /units/:id
router.get('/:id', getUnit, (req, res) => {
  res.status(200).json({ code: 200, data: res.unit }) // 返回查询结果
})

// POST /units
router.post('/', async (req, res) => {
  const unit = new UnitModel({
    content: req.body.content, // 获取请求参数中的 content 字段
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
    await res.unit.remove() // 删除指定的单位
    res.status(200).json({ code: 200, message: 'Unit deleted' }) // 返回删除成功信息
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }
})

// 定义 getUnit 中间件函数，用于查询指定的单位
async function getUnit(req, res, next) {
  let unit

  try {
    unit = await UnitModel.findById(req.params.id) // 根据 ID 查询指定的单位
    if (unit == null) {
      return res.status(404).json({ code: 404, message: 'Unit not found' }) // 如果查询结果为空，返回 404 错误信息
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }

  res.unit = unit // 将查询结果保存到 res 对象中
  next() // 调用下一个中间件函数
}

module.exports = router
