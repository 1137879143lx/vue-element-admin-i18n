const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const fixtureSchema = new mongoose.Schema({
  fixtureNumber: {
    type: String,
    required: true
  }, // 夹具编号
  fixtureType: {
    type: String,
    required: true
  }, // 夹具类型
  partNumber: {
    type: String,
    required: true
  }, // 零件编号
  partVersion: {
    type: String,
    required: true
  }, // 零件版本
  requisitionNumber: {
    type: String,
    required: true
  }, // 申请单号
  materialNumber: {
    type: String,
    required: true
  }, // 材料编号
  materialName: {
    type: String,
    required: true
  }, // 材料名称
  materialSpec: {
    type: String,
    required: true
  }, // 材料规格
  quantity: {
    type: Number,
    required: true
  }, // 数量
  requisitionQuantity: {
    type: Number,
    required: true
  }, // 申请数量
  status: {
    type: String,
    required: true
  }, // 状态
  note: {
    type: String
  }, // 备注
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // 创建者
  createdAt: {
    type: Date,
    default: Date.now
  } // 创建时间
})

fixtureSchema.plugin(mongoosePaginate)
const Fixture = db.model('Fixture', fixtureSchema)

module.exports = Fixture
