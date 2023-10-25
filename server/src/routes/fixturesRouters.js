/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Fixture = require('../models/fixtureModel')

// GET /fixtures 获取所有夹具
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query // 解构请求参数，获取页码、每页数量和查询条件
  const skip = (page - 1) * limit // 计算需要跳过的文档数量
  try {
    const fixtures = await Fixture.find(query).skip(skip).limit(limit) // 查询夹具列表
    const count = await Fixture.countDocuments(query) // 查询符合条件的文档数量
    const totalPages = Math.ceil(count / limit) // 计算总页数

    res.status(200).json({ code: 200, data: fixtures, page, totalPages }) // 返回查询结果、页码和总页数
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }
})

// POST /fixtures 创建新夹具
router.post('/', async (req, res) => {
  const fixture = new Fixture(req.body) // 创建新夹具对象

  try {
    const newFixture = await fixture.save() // 将新夹具对象保存到数据库中
    res.status(201).json({ code: 200, data: newFixture }) // 返回成功信息和新夹具对象
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message }) // 返回错误信息
  }
})

// PATCH /fixtures/:id 更新指定 ID 的夹具
router.patch('/:id', getFixture, async (req, res) => {
  Object.keys(req.body).forEach((key) => {
    if (res.fixture[key] !== undefined) {
      res.fixture[key] = req.body[key] // 更新夹具对象的指定属性
    }
  })

  try {
    const updatedFixture = await res.fixture.save() // 保存更新后的夹具对象
    res.status(200).json({ code: 200, data: updatedFixture }) // 返回成功信息和更新后的夹具对象
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message }) // 返回错误信息
  }
})

// DELETE /fixtures/:id 删除指定 ID 的夹具
router.delete('/:id', getFixture, async (req, res) => {
  try {
    await res.fixture.remove() // 删除指定 ID 的夹具
    res.status(200).json({ code: 200, message: 'Fixture deleted' }) // 返回删除成功的消息
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }
})

// 中间件函数，用于获取指定 ID 的夹具并将其存储在 res.fixture 中
async function getFixture(req, res, next) {
  let fixture

  try {
    fixture = await Fixture.findById(req.params.id) // 查找指定 ID 的夹具
    if (fixture == null) {
      return res.status(404).json({ code: 404, message: 'Fixture not found' }) // 返回错误信息
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message }) // 返回错误信息
  }

  res.fixture = fixture // 将夹具对象赋值给 res.fixture
  next() // 调用下一个中间件函数
}
module.exports = router
