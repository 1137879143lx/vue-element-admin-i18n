const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const gaugeBorrowingSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  }, // 状态
  gaugeName: {
    type: String,
    required: true
  }, // 计量器名称
  specification: {
    type: String,
    required: true
  }, // 规格
  gaugeCode: {
    type: String,
    required: true
  }, // 计量器代码
  quantity: {
    type: Number,
    required: true
  }, // 数量
  borrowingTime: {
    type: Date,
    required: true
  }, // 借用时间
  expectedReturnTime: {
    type: Date,
    required: true
  }, // 预计归还时间
  borrower: {
    type: String,
    required: true
  } // 借用人
})

gaugeBorrowingSchema.plugin(mongoosePaginate)
const GaugeBorrowing = db.model('GaugeBorrowing', gaugeBorrowingSchema)

module.exports = GaugeBorrowing
