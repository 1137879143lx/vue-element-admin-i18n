const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const inspectionRecordSchema = new mongoose.Schema({
  materialCode: {
    type: String,
    required: true
  }, // 材料代码
  materialName: {
    type: String,
    required: true
  }, // 材料名称
  materialVersion: {
    type: String,
    required: true
  }, // 材料版本
  quantity: {
    type: Number,
    required: true
  }, // 数量
  process: {
    type: String,
    required: true
  }, // 工序
  department: {
    type: String,
    required: true
  }, // 部门
  inspector: {
    type: String,
    required: true
  }, // 检查员
  processingResult: {
    type: String,
    required: true
  }, // 处理结果
  processingOrderNumber: {
    type: String,
    required: true
  }, // 处理订单号
  inspectionType: {
    type: String,
    required: true
  }, // 检查类型
  inspectionTime: {
    type: Date,
    required: true
  }, // 检查时间
  status: {
    type: String,
    required: true
  }, // 状态
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // 创建者
  createdAt: {
    type: Date,
    default: Date.now
  }, // 创建时间
  updatedAt: {
    type: Date,
    default: Date.now
  }, // 更新时间
  image: {
    type: String
  } // 图片
})

inspectionRecordSchema.plugin(mongoosePaginate)
const InspectionRecord = db.model('InspectionRecord', inspectionRecordSchema)

module.exports = InspectionRecord
