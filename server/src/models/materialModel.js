const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const materialSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  density: {
    type: Number,
    required: true
  },
  maxStock: {
    type: Number,
    required: true
  },
  safetyStock: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
const Material = mongoose.model('Material', materialSchema)

module.exports = Material
