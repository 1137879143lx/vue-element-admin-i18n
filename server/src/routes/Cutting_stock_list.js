/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Cutting_stock_list = require('../models/Cutting_stock_list')

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1 // 获取页码，默认为第一页
  const limit = parseInt(req.query.limit) || 10 // 获取每页数据条数，默认为 10 条
  const skip = (page - 1) * limit // 计算需要跳过的数据条数
  // eslint-disable-next-line object-curly-spacing
  const query = req.query.q ? { $text: { $search: req.query.q } } : {} // 根据用户输入的参数进行查询
  try {
    /**
     * Retrieves a list of cutting stock items from the database.
     * @async
     * @function
     * @param {Object} query - The query object to filter the results.
     * @param {number} skip - The number of items to skip.
     * @param {number} limit - The maximum number of items to retrieve.
     * @returns {Promise<Array>} - A promise that resolves to an array of cutting stock items.
     */
    const cutting_stock_lists = await Cutting_stock_list.find(query).skip(skip).limit(limit)
    const count = await Cutting_stock_list.countDocuments(query) // 获取数据总条数
    const totalPages = Math.ceil(count / limit) // 计算总页数

    res.status(200).json({ data: cutting_stock_lists, page, totalPages }) // 返回数据中包含 code: 200 表示请求成功
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// GET /cutting_stock_lists/:id 获取指定 ID 的下料列表
router.get('/:id', getCutting_stock_list, (req, res) => {
  res.status(200).json({ data: res.cutting_stock_list }) // 返回数据中包含 code: 200 表示请求成功
})

// POST /cutting_stock_lists 创建新下料列表
router.post('/', async (req, res) => {
  try {
    const cutting_stock_list = await Cutting_stock_list.create(req.body)
    res.status(201).json({ code: 200, data: cutting_stock_list })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})
// PATCH /cutting_stock_lists/:id 更新指定 ID 的下料列表
router.patch('/:id', getCutting_stock_list, async (req, res) => {
  const fieldsToUpdate = ['Production_order', 'Material_code', 'Material_name', 'Version', 'Cutting_name', 'Cutting_number', 'Cutting_size']
  fieldsToUpdate.forEach((field) => {
    if (req.body[field] != null) {
      res.cutting_stock_list[field] = req.body[field]
    }
  })

  try {
    const updatedCutting_stock_list = await res.cutting_stock_list.save()
    res.json({ code: 200, data: updatedCutting_stock_list })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})
// DELETE /cutting_stock_lists/:id 删除指定 ID 的下料列表
router.delete('/:id', getCutting_stock_list, async (req, res) => {
  try {
    await res.cutting_stock_list.remove()
    res.status(200).json({ code: 200, message: 'Cutting_stock_list deleted' }) // 返回数据中包含 code: 200 表示请求成功
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// 中间件函数，用于获取指定 ID 的下料列表并将其存储在 res.cutting_stock_list 中
async function getCutting_stock_list(req, res, next) {
  let cutting_stock_list

  try {
    cutting_stock_list = await Cutting_stock_list.findById(req.params.id)
    if (cutting_stock_list == null) {
      return res.status(404).json({ code: 404, message: 'Cutting_stock_list not found' })
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message })
  }

  res.cutting_stock_list = cutting_stock_list
  next()
}

module.exports = router
