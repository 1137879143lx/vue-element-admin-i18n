const mongoose = require('mongoose')
const db = require('../config/db')

const processSettingSchema = new mongoose.Schema({
  // 工序名称
  name: {
    type: String,
    required: true,
    unique: true
  },
  // 工序代号
  code: {
    type: String,
    required: true,
    unique: true
  },
  // 资源组
  resourceGroup: {
    type: String,
    required: true
  },
  // 单价
  price: {
    type: Number,
    required: true
  },
  // 是否委外
  isOutsourced: {
    type: Boolean,
    default: false
  },
  // 是否检验
  isInspected: {
    type: Boolean,
    default: true
  },
  // 工序状态
  status: {
    type: String,
    enum: ['启用', '禁用'],
    default: '启用'
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const ProcessSetting = db.model('ProcessSetting', processSettingSchema)

module.exports = ProcessSetting
