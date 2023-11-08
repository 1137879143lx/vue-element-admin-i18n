const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')
const mongoosePaginate = require('mongoose-paginate-v2')

const Pr_ReplenishmentRequisitionSchema = new mongoose.Schema({
  BillId: {
    type: String,
    required: [true, '单据号不能为空']
  }, // 单据号
  ToolingNo: {
    type: String
  }, // 工具编号
  PartNo: {
    type: String,
    required: [true, '零件号不能为空']
  }, // 零件号
  PartName: {
    type: String
  }, // 零件名称
  Quantity: {
    type: Number
  }, // 数量
  Application: {
    type: String
  }, // 应用
  ScrapPercentage: {
    type: Number
  }, // 报废百分比
  State: {
    type: String
  }, // 状态
  PrTaskBillId: {
    type: String
  }, // Pr任务单据ID
  Creator: {
    type: String
  }, // 创建者
  CreationDate: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  }, // 创建日期
  updateTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  }, // 更新时间
  Remarks: {
    type: String
  }, // 备注
  enable_flag: {
    type: String,
    default: 'Y'
  } // 是否启用
})

Pr_ReplenishmentRequisitionSchema.plugin(mongoosePaginate)
const Pr_ReplenishmentRequisition = db.model('Pr_ReplenishmentRequisition', Pr_ReplenishmentRequisitionSchema)
module.exports = Pr_ReplenishmentRequisition
