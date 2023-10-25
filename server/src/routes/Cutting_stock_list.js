/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Cutting_stock_list = require('../models/Cutting_stock_list')

// GET /cutting_stock_lists 获取所有下料列表
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1 // 获取页码，默认为第一页
  const limit = parseInt(req.query.limit) || 10 // 获取每页数据条数，默认为 10 条
  const skip = (page - 1) * limit // 计算需要跳过的数据条数
  try {
    /**
     * Retrieves a list of cutting stock items from the database.
     *
     * @async
     * @function
     * @param {number} skip - The number of items to skip.
     * @param {number} limit - The maximum number of items to retrieve.
     * @returns {Promise<Array>} - A promise that resolves to an array of cutting stock items.
     */
    const cutting_stock_lists = await Cutting_stock_list.find().skip(skip).limit(limit)
    const count = await Cutting_stock_list.countDocuments() // 获取数据总条数
    const totalPages = Math.ceil(count / limit) // 计算总页数

    res.status(200).json({ code: 200, data: cutting_stock_lists, page, totalPages }) // 返回数据中包含 code: 200 表示请求成功
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// GET /cutting_stock_lists/:id 获取指定 ID 的下料列表
router.get('/:id', getCutting_stock_list, (req, res) => {
  res.status(200).json({ code: 200, data: res.cutting_stock_list }) // 返回数据中包含 code: 200 表示请求成功
})

// POST /cutting_stock_lists 创建新下料列表
router.post('/', async (req, res) => {
  /**
   * Creates a new Cutting_stock_list object with the provided properties.
   * @param {Object} req.body - The request body containing the properties for the new Cutting_stock_list object.
   * @param {string} req.body.Production_order - The production order for the cutting stock.
   * @param {string} req.body.Material_code - The material code for the cutting stock.
   * @param {string} req.body.Material_name - The material name for the cutting stock.
   * @param {string} req.body.Version - The version for the cutting stock.
   * @param {string} req.body.Cutting_name - The name of the cutting stock.
   * @param {number} req.body.Cutting_number - The number of the cutting stock.
   * @param {string} req.body.Cutting_size - The size of the cutting stock.
   * @param {number} req.body.Theoretical_dosage - The theoretical dosage for the cutting stock.
   * @param {number} req.body.Actual_dosage - The actual dosage for the cutting stock.
   * @param {string} req.body.Customer_delivery - The customer delivery for the cutting stock.
   * @param {string} req.body.Cutting_date - The date of the cutting stock.
   * @param {string} req.body.Cutting_personnel - The personnel responsible for the cutting stock.
   * @param {boolean} req.body.Is_cutting - Whether or not the cutting stock is being cut.
   */
  const cutting_stock_list = new Cutting_stock_list({
    Production_order: req.body.Production_order,
    Material_code: req.body.Material_code,
    Material_name: req.body.Material_name,
    Version: req.body.Version,
    Cutting_name: req.body.Cutting_name,
    Cutting_number: req.body.Cutting_number,
    Cutting_size: req.body.Cutting_size,
    Theoretical_dosage: req.body.Theoretical_dosage,
    Actual_dosage: req.body.Actual_dosage,
    Customer_delivery: req.body.Customer_delivery,
    Cutting_date: req.body.Cutting_date,
    Cutting_personnel: req.body.Cutting_personnel
  })

  try {
    const newCutting_stock_list = await cutting_stock_list.save()
    res.status(201).json({ code: 200, data: newCutting_stock_list }) // 返回数据中包含 code: 200 表示请求成功
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// PATCH /cutting_stock_lists/:id 更新指定 ID 的下料列表
router.patch('/:id', getCutting_stock_list, async (req, res) => {
  if (req.body.Production_order != null) {
    res.cutting_stock_list.Production_order = req.body.Production_order
  }
  if (req.body.Material_code != null) {
    res.cutting_stock_list.Material_code = req.body.Material_code
  }
  if (req.body.Material_name != null) {
    res.cutting_stock_list.Material_name = req.body.Material_name
  }
  if (req.body.Version != null) {
    res.cutting_stock_list.Version = req.body.Version
  }
  if (req.body.Cutting_name != null) {
    res.cutting_stock_list.Cutting_name = req.body.Cutting_name
  }
  if (req.body.Cutting_number != null) {
    res.cutting_stock_list.Cutting_number = req.body.Cutting_number
  }
  if (req.body.Cutting_size != null) {
    res.cutting_stock_list.Cutting_size = req.body.Cutting_size
  }

  try {
    const updatedCutting_stock_list = await res.cutting_stock_list.save()
    res.status(200).json({ code: 200, data: updatedCutting_stock_list }) // 返回数据中包含 code: 200 表示请求成功
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
