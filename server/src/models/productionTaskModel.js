const mongoose = require('mongoose')

/**
 * Mongoose schema for production tasks.
 * @typedef {Object} ProductionTaskSchema
 * @property {string} taskNumber - The task number.
 * @property {string} customer - The customer name.
 * @property {string} project - The project name.
 * @property {string} image - The image name.
 * @property {string} materialCode - The material code.
 * @property {string} materialName - The material name.
 * @property {string} version - The version number.
 * @property {number} quantity - The quantity of the material.
 * @property {string} type - The type of the material.
 * @property {Date} customerDeliveryDate - The delivery date for the customer.
 * @property {string} status - The status of the task.
 * @property {string} process - The process of the task.
 * @property {string} urgency - The urgency of the task.
 * @property {mongoose.Schema.Types.ObjectId} createdBy - The ID of the user who created the task.
 * @property {Date} createdAt - The date when the task was created.
 */
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

const ProductionTask = mongoose.model('ProductionTask', productionTaskSchema)

module.exports = ProductionTask
