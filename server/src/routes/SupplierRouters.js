// 供应商路由

const express = require('express')
const router = express.Router()
const Supplier = require('../models/SupplierModel')

// 创建供应商
router.post('/create', (req, res) => {
  // 接收参数
  const { SupplierId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode } = req.body
  // 判断参数是否为空
  if (!SupplierId || !ShortName || !FullName || !Address || !Contact || !Tel || !Email || !Phone || !Tax || !CurrencyCode) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }

  // 查询数据库中是否存在该客户
  Supplier.findOne({ SupplierId })
    .then((data) => {
      // 如果存在
      if (data) {
        return res.json({
          code: 402,
          msg: '该供应商已存在'
        })
      }
      // 如果不存在
      // 创建供应商
      Supplier.create({ SupplierId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
    })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '供应商创建成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 查询供应商
router.get('/list', (req, res) => {
  // 查询数据库
  Supplier.find()
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

// 删除供应商
router.get('/delete', (req, res) => {
  // 接收参数
  const { SupplierId } = req.query
  // 判断参数是否为空
  if (!SupplierId) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }
  // 查询数据库
  Supplier.findOneAndDelete({ SupplierId })
    .then((data) => {
      res.json({
        code: 200,
        msg: '删除成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 修改供应商
router.post('/update', (req, res) => {
  // 接收参数
  const { SupplierId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode } = req.body
  // 判断参数是否为空
  if (!SupplierId || !ShortName || !FullName || !Address || !Contact || !Tel || !Email || !Phone || !Tax || !CurrencyCode) {
    return res.json({
      code: 401,
      msg: '参数不能为空'
    })
  }
  // 查询数据库
  Supplier.findOneAndUpdate({ SupplierId }, { SupplierId, ShortName, FullName, Address, Contact, Tel, Email, Phone, Tax, CurrencyCode })
    .then((data) => {
      res.json({
        code: 200,
        msg: '修改成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

module.exports = router

// Path: server\src\routes\Supplier.js
// Compare this snippet from server\src\routes\Customer.js:
