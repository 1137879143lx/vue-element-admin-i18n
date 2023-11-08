const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const materialCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }, // 材料类别名称
  unit: {
    type: String,
    required: true
  }, // 单位
  codeRule: {
    type: String,
    required: true,
    unique: true
  }, // 编码规则
  createdBy: {
    type: String
  }, // 创建者
  createdAt: {
    type: Date,
    default: Date.now
  } // 创建时间
})

materialCategorySchema.plugin(mongoosePaginate)
const MaterialCategory = db.model('MaterialCategory', materialCategorySchema)

module.exports = MaterialCategory
