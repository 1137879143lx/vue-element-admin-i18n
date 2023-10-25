// Import the necessary modules and models
const express = require('express')
const router = express.Router()
const SalesQuote = require('../models/salesQuoteModel')

// 获取所有销售报价单
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, ...query } = req.query
    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      collation: { locale: 'en' },
      lean: true
    }
    const salesQuotes = await SalesQuote.paginate(query, options)
    res.status(200).json(salesQuotes)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /salesQuotes/:id 获取指定 ID 的销售报价单
router.get('/:id', getSalesQuote, (req, res) => {
  res.status(200).json(res.salesQuote)
})

// POST /salesQuotes 创建新的销售报价单
router.post('/', async (req, res) => {
  const salesQuote = new SalesQuote(req.body)
  try {
    // 获取最后一个订单号
    const lastSalesQuote = await SalesQuote.findOne().sort({ orderNumber: -1 })
    const orderNumber = lastSalesQuote ? getNextOrderNumber(lastSalesQuote.orderNumber) : 'XS2023102501'

    const newSalesQuote = await salesQuote.save()
    res.status(200).json(newSalesQuote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// PUT /salesQuotes/:id 更新指定 ID 的销售报价单
router.patch('/:id', getSalesQuote, async (req, res) => {
  if (req.body.quoteNumber != null) {
    res.salesQuote.quoteNumber = req.body.quoteNumber
  }
  if (req.body.customerName != null) {
    res.salesQuote.customerName = req.body.customerName
  }
  if (req.body.amount != null) {
    res.salesQuote.amount = req.body.amount
  }
  try {
    const updatedSalesQuote = await res.salesQuote.save()
    res.status(200).json(updatedSalesQuote)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// DELETE /salesQuotes/:id 删除指定 ID 的销售报价单
router.delete('/:id', getSalesQuote, async (req, res) => {
  try {
    await res.salesQuote.remove()
    res.status(200).json({ message: 'Sales quote deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// 中间件函数，用于获取指定 ID 的销售报价单
async function getSalesQuote(req, res, next) {
  let salesQuote
  try {
    salesQuote = await SalesQuote.findById(req.params.id)
    if (salesQuote == null) {
      return res.status(404).json({ message: 'Cannot find sales quote' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  res.salesQuote = salesQuote
  next()
}

module.exports = router
