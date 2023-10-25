/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Fixture = require('../models/fixtureModel')

// GET /fixtures 获取所有夹具
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query
  const skip = (page - 1) * limit
  try {
    /**
     * Finds fixtures based on the provided query, skips the specified number of documents, and limits the number of documents returned.
     * @param {Object} query - The query used to find fixtures.
     * @param {number} skip - The number of documents to skip.
     * @param {number} limit - The maximum number of documents to return.
     * @returns {Promise<Array>} - A promise that resolves to an array of fixtures.
     */
    const fixtures = await Fixture.find(query).skip(skip).limit(limit)
    const count = await Fixture.countDocuments(query)
    const totalPages = Math.ceil(count / limit)

    res.status(200).json({ code: 200, data: fixtures, page, totalPages })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// GET /fixtures/:id 获取指定 ID 的夹具
router.get('/:id', getFixture, (req, res) => {
  res.status(200).json({ code: 200, data: res.fixture }) // 返回数据中包含 code: 200 表示请求成功
})

// POST /fixtures 创建新夹具
router.post('/', async (req, res) => {
  const fixture = new Fixture(req.body)

  try {
    const newFixture = await fixture.save()
    res.status(201).json({ code: 200, data: newFixture })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// PATCH /fixtures/:id 更新指定 ID 的夹具
router.patch('/:id', getFixture, async (req, res) => {
  Object.keys(req.body).forEach((key) => {
    if (res.fixture[key] !== undefined) {
      res.fixture[key] = req.body[key]
    }
  })

  try {
    const updatedFixture = await res.fixture.save()
    res.status(200).json({ code: 200, data: updatedFixture })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// DELETE /fixtures/:id 删除指定 ID 的夹具
router.delete('/:id', getFixture, async (req, res) => {
  try {
    await res.fixture.remove()
    res.status(200).json({ code: 200, message: 'Fixture deleted' }) // 返回数据中包含 code: 200 表示请求成功
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// 中间件函数，用于获取指定 ID 的夹具并将其存储在 res.fixture 中
async function getFixture(req, res, next) {
  let fixture

  try {
    fixture = await Fixture.findById(req.params.id)
    if (fixture == null) {
      return res.status(404).json({ code: 404, message: 'Fixture not found' })
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message })
  }

  res.fixture = fixture
  next()
}

module.exports = router
