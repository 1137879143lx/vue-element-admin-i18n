const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')

const supplierSchema = new mongoose.Schema({
  SupplierId: {
    type: String,
    required: [true, '供应商编号不能为空'],
    unique: true
  }, // 供应商编号
  ShortName: {
    type: String
  }, // 供应商简称
  FullName: {
    type: String
  }, // 供应商全称
  Address: {
    type: String
  }, // 供应商地址
  Contact: {
    type: String
  }, // 联系人
  Tel: {
    type: String
  }, // 电话
  Email: {
    type: String
  }, // 邮箱
  Phone: {
    type: String
  }, // 手机号
  Tax: {
    type: String
  }, // 税号
  CurrencyCode: {
    type: String
  }, // 货币代码
  enable_flag: {
    type: String,
    default: 'Y'
  }, // 是否启用
  createTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  }, // 创建时间
  updateTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  } // 更新时间
})

module.exports = db.model('suppliers', supplierSchema)
