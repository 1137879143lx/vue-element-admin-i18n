const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')
const mongoosePaginate = require('mongoose-paginate-v2')

// 定义客户模型
const customerSchema = new mongoose.Schema({
  CustomerId: {
    type: String,
    required: [true, '客户编号不能为空'],
    unique: true
  }, // 客户编号
  ShortName: {
    type: String
  }, // 客户简称
  FullName: {
    type: String
  }, // 客户全称
  Address: {
    type: String
  }, // 地址
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
  }, // 手机
  Tax: {
    type: String
  }, // 税号
  CurrencyCode: {
    type: String
  }, // 货币代码
  enable_flag: {
    type: String,
    default: 'Y'
  }, // 是否启用标志
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

customerSchema.plugin(mongoosePaginate)
const Customer = db.model('customers', customerSchema)
module.exports = Customer // 导出客户模型
