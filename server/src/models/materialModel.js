const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const materialSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true, // 材料代码，必填，唯一
    unique: true
  },
  name: {
    type: String,
    required: true // 材料名称，必填
  },
  description: {
    type: String // 材料描述
  },
  tags: {
    type: [String] // 材料标签
  },
  unit: {
    type: String // 材料单位
  },
  density: {
    type: Number // 材料密度
  },
  maxStock: {
    type: Number // 最大库存
  },
  safetyStock: {
    type: Number // 安全库存
  },
  price: {
    type: Number // 材料价格
  },
  category: {
    type: String // 材料类别
  },
  status: {
    type: String // 材料状态
  },
  image: {
    type: String // 材料图片
  },
  createdBy: {
    type: String // 创建者
  },
  createdAt: {
    type: Date,
    default: Date.now // 创建时间
  },
  updatedAt: {
    type: Date,
    default: Date.now // 更新时间
  }
})

materialSchema.plugin(mongoosePaginate)
const Material = db.model('Material', materialSchema)

module.exports = Material
