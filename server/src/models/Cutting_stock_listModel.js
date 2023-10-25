// 下料列表模型 Cutting_stock_list 生产任务号 物料编码 物料名称 版本 下料名称 下料数量 下料尺寸 理论用量 实际用量 客户交期 下料日期 下料人员 是否已经下料

// 下料列表模型 Cutting_stock_list 生产任务号 物料编码 物料名称 版本 下料名称 下料数量 下料尺寸 理论用量 实际用量 客户交期 下料日期 下料人员 是否已经下料
const mongoose = require('mongoose')
const db = require('../config/db')
const moment = require('moment')
const cutting_stock_listSchema = new mongoose.Schema({
  Production_order: {
    type: String,
    required: [true, '生产任务号不能为空']
  },
  Material_code: {
    type: String,
    required: [true, '物料编码不能为空']
  },
  Material_name: {
    type: String,
    required: [true, '物料名称不能为空']
  },
  Version: {
    type: String,
    required: [true, '版本不能为空']
  },
  Cutting_name: {
    type: String,
    required: [true, '下料名称不能为空']
  },
  Cutting_number: {
    type: Number,
    required: [true, '下料数量不能为空']
  },
  Cutting_size: {
    type: String,
    required: [true, '下料尺寸不能为空']
  },
  Theoretical_dosage: {
    type: Number // 理论用量
  },
  Actual_dosage: {
    type: Number // 实际用量
  },
  Customer_delivery: {
    type: String,
    required: [true, '客户交期不能为空']
  },
  Cutting_date: {
    type: String,
    required: [true, '下料日期不能为空']
  },
  Cutting_personnel: {
    type: String,
    required: [true, '下料人员不能为空']
  },
  Is_cutting: {
    type: Boolean, // 是否已经下料
    required: [true, '是否已经下料不能为空'],
    default: false
  },
  enable_flag: {
    type: String,
    default: 'Y'
  }, // 是否启用

  createTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  },
  updateTime: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000, // 东8区时间 加上8小时
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss') // 东8区时间 加上8小时
  }
})
module.exports = db.model('cutting_stock_list', cutting_stock_listSchema)
// module.exports = Cutting_stock_list // 导出下料列表模型
