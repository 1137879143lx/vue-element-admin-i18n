// Import the necessary modules and models
const express = require('express')
const router = express.Router()
const SalesQuoteModel = require('../models/salesQuoteModel')

// 获取所有销售报价单
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, ...query } = req.query // 解构请求参数，获取页码、每页数量和查询条件
    const options = {
      page: parseInt(page), // 将页码转换为整数
      limit: parseInt(limit), // 将每页数量转换为整数
      sort: { createdAt: -1 }, // 按创建时间倒序排序
      collation: { locale: 'en' }, // 按英文排序
      lean: true // 返回普通 JavaScript 对象，而不是 Mongoose 文档对象
    }
    const salesQuotes = await SalesQuoteModel.paginate(query, options) // 使用 Mongoose 分页插件查询销售报价单
    res.status(200).json(salesQuotes) // 返回查询结果
  } catch (err) {
    res.status(500).json({ message: err.message }) // 返回错误信息
  }
})

// GET /salesQuotes/:id 获取指定 ID 的销售报价单
router.get('/:id', getSalesQuote, (req, res) => {
  res.status(200).json(res.salesQuote)
})

// POST /salesQuotes 创建新的销售报价单
router.post('/', async (req, res) => {
  const salesQuote = new SalesQuoteModel(req.body) // 创建新的销售报价单对象

  try {
    // 获取最后一个订单号
    const lastSalesQuote = await SalesQuoteModel.findOne().sort({ orderNumber: -1 }) // 查找最后一个销售报价单
    let orderNumber = 'XS2023102501' // 默认订单号为 XS2023102501
    if (lastSalesQuote) {
      // 如果存在最后一个销售报价单
      orderNumber = getNextOrderNumber(lastSalesQuote.orderNumber) // 获取下一个订单号
    }
    salesQuote.orderNumber = orderNumber // 将订单号赋值给销售报价单对象

    const newSalesQuote = await salesQuote.save() // 将销售报价单保存到数据库中
    res.status(200).json(newSalesQuote) // 返回新创建的销售报价单对象
  } catch (err) {
    res.status(400).json({ message: err.message }) // 返回错误信息
  }
})
// 获取下一个订单号
function getNextOrderNumber(orderNumber) {
  const prefix = orderNumber.substring(0, 2) // 获取订单号前缀
  const date = orderNumber.substring(2, 10) // 获取订单号日期部分
  const number = parseInt(orderNumber.substring(10)) + 1 // 获取订单号数字部分，并加 1
  return `${prefix}${date}${number.toString().padStart(2, '0')}` // 将前缀、日期和数字部分拼接起来，得到新的订单号
}

// PUT /salesQuotes/:id 更新指定 ID 的销售报价单
router.patch('/:id', getSalesQuote, async (req, res) => {
  // 检查请求体中是否包含需要更新的字段
  if (req.body.quoteNumber != null) {
    res.salesQuote.quoteNumber = req.body.quoteNumber // 更新报价单号
  }
  if (req.body.customerName != null) {
    res.salesQuote.customerName = req.body.customerName // 更新客户名称
  }
  if (req.body.amount != null) {
    res.salesQuote.amount = req.body.amount // 更新报价金额
  }

  try {
    const updatedSalesQuote = await res.salesQuote.save() // 将更新后的销售报价单保存到数据库中
    res.status(200).json(updatedSalesQuote) // 返回更新后的销售报价单对象
  } catch (err) {
    res.status(400).json({ message: err.message }) // 返回错误信息
  }
})

// DELETE /salesQuotes/:id 删除指定 ID 的销售报价单
router.delete('/:id', getSalesQuote, async (req, res) => {
  try {
    await res.salesQuote.remove() // 从数据库中删除销售报价单
    res.status(200).json({ message: 'Sales quote deleted' }) // 返回删除成功的消息
  } catch (err) {
    res.status(500).json({ message: err.message }) // 返回错误信息
  }
})

// 中间件函数，用于获取指定 ID 的销售报价单
async function getSalesQuote(req, res, next) {
  let salesQuote
  try {
    salesQuote = await SalesQuoteModel.findById(req.params.id) // 查找指定 ID 的销售报价单
    if (salesQuote == null) {
      // 如果销售报价单不存在
      return res.status(404).json({ message: 'Cannot find sales quote' }) // 返回错误信息
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }) // 返回错误信息
  }
  res.salesQuote = salesQuote // 将销售报价单对象赋值给 res.salesQuote
  next() // 调用下一个中间件函数
}
module.exports = router
