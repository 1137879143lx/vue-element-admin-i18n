const mongoose = require('mongoose')
const db = require('../config/db')

const surfaceTreatmentSchema = new mongoose.Schema({
  // 表面处理名称
  name: {
    type: String, // 字符串类型
    required: true, // 必填
    unique: true // 唯一性
  },
  // 单价
  price: {
    type: Number, // 数字类型
    required: true // 必填
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const SurfaceTreatment = db.model('SurfaceTreatment', surfaceTreatmentSchema)

module.exports = SurfaceTreatment
