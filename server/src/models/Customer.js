// 创建客户模型 CustomerId ShortName FullName Address Contact Tel Email Phone Tax CurrencyCode
const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')
const customerSchema = new mongoose.Schema({
  CustomerId: {
    type: String,
    required: [true, '客户编号不能为空'],
    unique: true
  },
  ShortName: {
    type: String
  },
  FullName: {
    type: String
  },
  Address: {
    type: String
  },
  Contact: {
    type: String
  },
  Tel: {
    type: String
  },
  Email: {
    type: String
  },
  Phone: {
    type: String
  },
  Tax: {
    type: String
  },
  CurrencyCode: {
    type: String
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
const Customer = db.model('customers', customerSchema)
module.exports = Customer // 导出客户模型
