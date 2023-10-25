const mongoose = require('mongoose')
/**
 * Mongoose schema for Material model
 * @typedef {Object} MaterialSchema
 * @property {string} code - The code of the material
 * @property {string} name - The name of the material
 * @property {string} description - The description of the material
 * @property {string[]} tags - The tags associated with the material
 * @property {string} unit - The unit of the material
 * @property {number} density - The density of the material
 * @property {number} maxStock - The maximum stock of the material
 * @property {number} safetyStock - The safety stock of the material
 * @property {number} price - The price of the material
 * @property {string} category - The category of the material
 * @property {string} status - The status of the material
 * @property {string} image - The image of the material
 * @property {mongoose.Schema.Types.ObjectId} createdBy - The user who created the material
 * @property {Date} createdAt - The date when the material was created
 * @property {Date} updatedAt - The date when the material was last updated
 */
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

const Material = mongoose.model('Material', materialSchema)

module.exports = Material
