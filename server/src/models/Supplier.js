// 创建供应商模型 CustomerId ShortName FullName Address Contact Tel Email Phone Tax CurrencyCode
const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')
const supplierSchema = new mongoose.Schema({
  SupplierId: {
    type: String,
    required: [true, '供应商编号不能为空'],
    unique: true
  },
  ShortName: {
    type: String,
    required: [true, '供应商简称不能为空']
  },
  FullName: {
    type: String,
    required: [true, '供应商全称不能为空']
  },
  Address: {
    type: String,
    required: [true, '供应商地址不能为空']
  },
  Contact: {
    type: String,
    required: [true, '供应商联系人不能为空']
  },
  Tel: {
    type: String,
    required: [true, '供应商电话不能为空']
  },
  Email: {
    type: String,
    required: [true, '供应商邮箱不能为空']
  },
  Phone: {
    type: String,
    required: [true, '供应商手机不能为空']
  },
  Tax: {
    type: String,
    required: [true, '供应商税号不能为空']
  },
  CurrencyCode: {
    type: String,
    required: [true, '供应商币种不能为空']
  },
  enable_flag: {
    type: String,
    default: 'Y'
  }, // 是否启用

  createTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  },
  updateTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  }
})
// supplierSchema.set('toJSON', { getters: true }) // 在查询时，转换为JSON对象 //
// supplierSchema.set('toObject', { getters: true }) // 在查询时，转换为Object对象
module.exports = db.model('suppliers', supplierSchema)
// Compare this snippet from server\src\router\index.js:
// // Path: server\src\router\index.js
