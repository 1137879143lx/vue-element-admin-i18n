const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const productionTaskSchema = new mongoose.Schema({
  taskNumber: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  project: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  materialCode: {
    type: String,
    required: true
  },
  materialName: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  customerDeliveryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  process: {
    type: String,
    required: true
  },
  urgency: {
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
  }
})

productionTaskSchema.plugin(mongoosePaginate)
const ProductionTask = mongoose.model('ProductionTask', productionTaskSchema)

module.exports = ProductionTask
