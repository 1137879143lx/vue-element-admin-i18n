const mongoose = require('mongoose')
const db = require('../config/db')
const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // 唯一性约束
  },
  createdBy: {
    type: String // 引用类型
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// unitSchema.plugin(mongoosePaginate)
const Unit = db.model('Unit', unitSchema)
module.exports = Unit
