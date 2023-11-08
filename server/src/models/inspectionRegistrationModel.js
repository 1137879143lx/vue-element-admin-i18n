const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const inspectionRegistrationSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  }, // 员工姓名
  productionOrderNumber: {
    type: String,
    required: true
  }, // 生产订单号
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
  inspectionQuantity: {
    type: Number,
    required: true
  }, // 检查数量
  inspectionType: {
    type: String,
    required: true
  }, // 检查类型
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // 创建者
  createdAt: {
    type: Date,
    default: Date.now
  }, // 创建时间
  image: {
    type: String
  } // 图片
})

inspectionRegistrationSchema.plugin(mongoosePaginate)
const InspectionRegistration = db.model('InspectionRegistration', inspectionRegistrationSchema)

module.exports = InspectionRegistration
