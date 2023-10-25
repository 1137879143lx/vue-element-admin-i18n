// 生产补料mongioose数据库模型 BillId ToolingNo PartNo PartName Quantity Application ScrapPercentage State PrTaskBillId Creator CreationDate Remarks

const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')
const mongoosePaginate = require('mongoose-paginate-v2')

const Pr_ReplenishmentRequisitionSchema = new mongoose.Schema({
  BillId: {
    type: String,
    required: [true, '单据号不能为空']
  },
  ToolingNo: {
    type: String,
    required: [true, '工装编号不能为空']
  },
  PartNo: {
    type: String,
    required: [true, '零件号不能为空']
  },
  PartName: {
    type: String,
    required: [true, '零件名称不能为空']
  },
  Quantity: {
    type: Number,
    required: [true, '数量不能为空']
  },
  Application: {
    type: String,
    required: [true, '申请人不能为空']
  },
  ScrapPercentage: {
    type: Number,
    required: [true, '报废百分比不能为空']
  },
  State: {
    type: String,
    required: [true, '状态不能为空']
  },
  PrTaskBillId: {
    type: String,
    required: [true, '生产任务单号不能为空']
  },
  Creator: {
    type: String,
    required: [true, '创建人不能为空']
  },
  CreationDate: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  },
  updateTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  },
  Remarks: {
    type: String,
    required: [true, '备注不能为空']
  },
  enable_flag: {
    type: String,
    default: 'Y'
  } // 是否启用
})

Pr_ReplenishmentRequisitionSchema.plugin(mongoosePaginate)
const Pr_ReplenishmentRequisition = db.model('Pr_ReplenishmentRequisition', Pr_ReplenishmentRequisitionSchema)
module.exports = Pr_ReplenishmentRequisition
// # sourceMappingURL=Pr_ReplenishmentRequisition.js.map
