const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const inspectionRegistrationSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true
  },
  productionOrderNumber: {
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
  materialVersion: {
    type: String,
    required: true
  },
  inspectionQuantity: {
    type: Number,
    required: true
  },
  inspectionType: {
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
  image: {
    type: String
  }
})

inspectionRegistrationSchema.plugin(mongoosePaginate)
const InspectionRegistration = mongoose.model('InspectionRegistration', inspectionRegistrationSchema)

module.exports = InspectionRegistration
