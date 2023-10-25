const mongoose = require('mongoose')

/**
 * Fixture schema for MongoDB
 * @typedef {Object} FixtureSchema
 * @property {string} fixtureNumber - The fixture number
 * @property {string} fixtureType - The fixture type
 * @property {string} partNumber - The part number
 * @property {string} partVersion - The part version
 * @property {string} requisitionNumber - The requisition number
 * @property {string} materialNumber - The material number
 * @property {string} materialName - The material name
 * @property {string} materialSpec - The material specification
 * @property {number} quantity - The quantity of the material
 * @property {number} requisitionQuantity - The requisition quantity of the material
 * @property {string} status - The status of the fixture
 * @property {string} [note] - Optional note for the fixture
 * @property {mongoose.Schema.Types.ObjectId} createdBy - The user who created the fixture
 * @property {Date} [createdAt=Date.now] - The date when the fixture was created
 */
const fixtureSchema = new mongoose.Schema({
  fixtureNumber: {
    type: String,
    required: true
  },
  fixtureType: {
    type: String,
    required: true
  },
  partNumber: {
    type: String,
    required: true
  },
  partVersion: {
    type: String,
    required: true
  },
  requisitionNumber: {
    type: String,
    required: true
  },
  materialNumber: {
    type: String,
    required: true
  },
  materialName: {
    type: String,
    required: true
  },
  materialSpec: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  requisitionQuantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  note: {
    type: String
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

const Fixture = mongoose.model('Fixture', fixtureSchema)

module.exports = Fixture
