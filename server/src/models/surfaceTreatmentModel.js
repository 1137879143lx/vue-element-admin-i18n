const mongoose = require('mongoose')

const surfaceTreatmentSchema = new mongoose.Schema({
  // 表面处理名称
  name: {
    type: String,
    required: true
  },
  // 单价
  price: {
    type: Number,
    required: true
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const SurfaceTreatment = mongoose.model('SurfaceTreatment', surfaceTreatmentSchema)

module.exports = SurfaceTreatment
