const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')
const materialSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true, // 必填
    unique: true // 唯一的
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  unit: {
    type: String
  },
  density: {
    type: Number
  },
  maxStock: {
    type: Number
  },
  safetyStock: {
    type: Number
  },
  price: {
    type: Number
  },
  category: {
    type: String
  },
  status: {
    type: String
  },
  image: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

materialSchema.plugin(mongoosePaginate)
const Material = db.model('Material', materialSchema)

module.exports = Material
