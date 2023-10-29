const express = require('express') // 引入 Express 框架
const router = express.Router() // 创建路由对象
const Customer = require('../models/CustomerModel') // 引入客户模型

// 创建客户
router.post('/', async (req, res) => {
  try {
    const { CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode } = req.body // 解构请求体中的客户信息
    if (!CustomerId || !ShortName || !FullName) {
      // 检查客户信息是否完整
      return res.json({ code: 400, msg: 'CustomerId、ShortName 和 FullName 不能为空' }) // 返回错误信息
    }
    let customer = await Customer.findOne({ CustomerId }) // 查找客户是否已存在
    if (customer) {
      // 如果客户已存在，则更新客户信息
      await Customer.updateOne({ CustomerId }, { ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
      res.json({ code: 200, msg: '客户信息更新成功' }) // 返回成功信息
    } else {
      // 如果客户不存在，则创建客户
      await Customer.create({ CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
      res.json({ code: 200, msg: '客户创建成功' }) // 返回成功信息
    }
  } catch (err) {
    res.json({ code: 500, msg: err.message }) // 返回错误信息
  }
})

// 获取客户列表
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query // 解构请求参数，获取页码、每页数量和查询条件
    const skip = (page - 1) * limit // 计算跳过的文档数量
    const query = search ? { $or: [{ CustomerId: { $regex: search, $options: 'i' } }, { ShortName: { $regex: search, $options: 'i' } }] } : {} // 构造查询条件
    const customers = await Customer.find(query).skip(skip).limit(parseInt(limit)) // 查询客户列表
    const count = await Customer.countDocuments(query) // 统计客户数量
    res.json({ code: 200, data: customers, count }) // 返回客户列表和客户数量
  } catch (err) {
    res.json({ code: 500, msg: err.message }) // 返回错误信息
  }
})

// 获取客户详情
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id) // 查找指定 ID 的客户
    if (!customer) {
      return res.json({ code: 404, msg: '客户不存在' }) // 返回错误信息
    }
    res.json({ code: 200, data: customer }) // 返回客户详情
  } catch (err) {
    res.json({ code: 500, msg: err.message }) // 返回错误信息
  }
})

// 更新客户
router.put('/:id', async (req, res) => {
  try {
    const { ShortName, FullName } = req.body // 解构请求体中的客户信息
    if (!ShortName || !FullName) {
      // 检查客户信息是否完整
      return res.json({ code: 400, msg: 'ShortName 和 FullName 不能为空' }) // 返回错误信息
    }
    const customer = await Customer.findById(req.params.id) // 查找指定 ID 的客户
    if (!customer) {
      return res.status(404).json({ code: 404, msg: '客户不存在' }) // 返回错误信息
    }
    Object.assign(customer, req.body) // 更新客户信息
    await customer.save() // 保存客户信息
    res.json({ code: 200, msg: '客户更新成功' }) // 返回成功信息
  } catch (err) {
    res.json({ code: 500, msg: err.message }) // 返回错误信息
  }
})

// 删除客户
router.delete('/:id', async (req, res) => {
  try {
    const result = await Customer.deleteOne({ _id: req.params.id }) // 删除指定 ID 的客户
    if (result.deletedCount === 0) {
      return res.json({ code: 404, msg: '客户不存在' }) // 返回错误信息
    }
    res.json({ code: 200, msg: '客户删除成功' }) // 返回成功信息
  } catch (err) {
    res.json({ code: 500, msg: err.message }) // 返回错误信息
  }
})

module.exports = router // 导出路由对象
