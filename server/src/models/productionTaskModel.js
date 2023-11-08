const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const productionTaskSchema = new mongoose.Schema({
  taskNumber: {
    type: String,
    required: true
  }, // 任务编号
  customer: {
    type: String,
    required: true
  }, // 客户
  project: {
    type: String,
    required: true
  }, // 项目
  image: {
    type: String,
    required: true
  }, // 图片
  materialCode: {
    type: String,
    required: true
  }, // 材料代码
  materialName: {
    type: String,
    required: true
  }, // 材料名称
  version: {
    type: String,
    required: true
  }, // 版本
  quantity: {
    type: Number,
    required: true
  }, // 数量
  type: {
    type: String,
    required: true
  }, // 类型
  customerDeliveryDate: {
    type: Date,
    required: true
  }, // 客户交货日期
  status: {
    type: String,
    required: true
  }, // 状态
  process: {
    type: String,
    required: true
  }, // 过程
  urgency: {
    type: String,
    required: true
  }, // 紧急程度
  createdBy: {
    type: String
  }, // 创建者
  createdAt: {
    type: Date,
    default: Date.now
  } // 创建时间
})

productionTaskSchema.plugin(mongoosePaginate)
const ProductionTask = db.model('ProductionTask', productionTaskSchema)

module.exports = ProductionTask
