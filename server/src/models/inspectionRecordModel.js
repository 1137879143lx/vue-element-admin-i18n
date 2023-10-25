const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const inspectionRecordSchema = new mongoose.Schema({
  materialCode: {
    type: String,
    required: true
  },
  materialName: {
    type: String,
    required: true
  },
  materialVersion: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  process: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  inspector: {
    type: String,
    required: true
  },
  processingResult: {
    type: String,
    required: true
  },
  processingOrderNumber: {
    type: String,
    required: true
  },
  inspectionType: {
    type: String,
    required: true
  },
  inspectionTime: {
    type: Date,
    required: true
  },
  status: {
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
  },
  image: {
    type: String
  }
})

inspectionRecordSchema.plugin(mongoosePaginate)
const InspectionRecord = mongoose.model('InspectionRecord', inspectionRecordSchema)

module.exports = InspectionRecord
