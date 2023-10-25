/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Customer = require('../models/Customer')

// 创建客户
router.post('/create', async (req, res) => {
  try {
    const { CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode } = req.body
    if (!CustomerId || !ShortName || !FullName) {
      return res.status(400).json({ code: 400, msg: 'CustomerId、ShortName 和 FullName 不能为空' })
    }
    const customer = await Customer.findOne({ CustomerId })
    if (customer) {
      return res.status(400).json({ code: 400, msg: '该客户已存在' })
    }
    await Customer.create({ CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
    res.json({ code: 200, msg: '客户创建成功' })
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message })
  }
})

// 获取客户列表
router.get('/list', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query
    const skip = (page - 1) * limit
    /**
     * Constructs a query object based on the search parameter.
     *
     * @param {string} search - The search parameter to filter the query by.
     * @returns {Object} - The query object constructed based on the search parameter.
     */
    const query = search ? { $or: [{ CustomerId: { $regex: search, $options: 'i' } }, { ShortName: { $regex: search, $options: 'i' } }] } : {}
    const customers = await Customer.find(query).skip(skip).limit(parseInt(limit))
    const count = await Customer.countDocuments(query)
    res.json({ code: 200, data: customers, count })
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message })
  }
})

// 获取客户详情
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ code: 404, msg: '客户不存在' })
    }
    res.json({ code: 200, data: customer })
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message })
  }
})

// 更新客户
// eslint-disable-next-line space-before-function-paren
router.put('/:id', async (req, res) => {
  try {
    const { ShortName, FullName } = req.body
    if (!ShortName || !FullName) {
      return res.status(400).json({ code: 400, msg: 'ShortName 和 FullName 不能为空' })
    }
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ code: 404, msg: '客户不存在' })
    }
    Object.assign(customer, req.body)
    await customer.save()
    res.json({ code: 200, msg: '客户更新成功' })
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message })
  }
})

// 删除客户
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ code: 404, msg: '客户不存在' })
    }
    await customer.remove()
    res.json({ code: 200, msg: '客户删除成功' })
  } catch (err) {
    res.status(500).json({ code: 500, msg: err.message })
  }
})

module.exports = router
