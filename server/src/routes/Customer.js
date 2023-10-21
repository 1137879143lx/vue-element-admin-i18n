// Customer 路由
// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入客户集合构造函数
const Customer = require('../models/Customer')
// 导入moment模块

router.post('/create', (req, res) => {
  // 接收参数
  const { CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode } = req.body
  // 判断参数是否为空
  if (!CustomerId || !ShortName || !FullName || !Address || !Contact || !Tel || !Email || !Phone || !Tax || !CurrencyCode) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }

  // 查询数据库中是否存在该客户
  Customer.findOne({ CustomerId })
    .then((data) => {
      // 如果存在
      if (data) {
        return res.json({
          code: 402,
          msg: '该客户已存在'
        })
      }
      // 如果不存在
      // 创建客户
      Customer.create({ CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
    })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '客户创建成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 查询客户
router.get('/list', (req, res) => {
  // 查询数据库
  Customer.find()
    .then((data) => {
      res.json({
        code: 200,
        msg: '查询成功',
        data: data
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 删除客户
router.get('/delete', (req, res) => {
  // 接收参数
  const { CustomerId } = req.query
  // 判断参数是否为空
  if (!CustomerId) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }
  // 查询数据库中是否存在该客户
  Customer.findOne({ CustomerId })
    .then((data) => {
      // 如果不存在
      if (!data) {
        return res.json({
          code: 402,
          msg: '该客户不存在'
        })
      }
      // 如果存在
      // 删除客户
      return Customer.deleteOne({ CustomerId })
    })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '客户删除成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 修改客户
router.post('/update', (req, res) => {
  // 接收参数
  const { CustomerId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode } = req.body
  // 判断参数是否为空
  if (!CustomerId || !ShortName || !FullName || !Address || !Contact || !Tel || !Email || !Phone || !Tax || !CurrencyCode) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }
  // 查询数据库中是否存在该客户
  Customer.findOne({ CustomerId })
    .then((data) => {
      // 如果不存在
      if (!data) {
        return res.json({
          code: 402,
          msg: '该客户不存在'
        })
      }
      // 如果存在
      // 修改客户
      return Customer.updateOne({ CustomerId }, { ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
    })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '客户修改成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 查询客户
router.get('/search', (req, res) => {
  // 接收参数
  const { CustomerId } = req.query
  // 判断参数是否为空
  if (!CustomerId) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }
  // 查询数据库
  Customer.find({ CustomerId })
    .then((data) => {
      res.json({
        code: 200,
        msg: '查询成功',
        data: data
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 导出路由对象
module.exports = router
//
// Path: server\src\routes\Material.js
// Compare this snippet from server\src\config\db.js:
