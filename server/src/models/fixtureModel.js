const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
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

fixtureSchema.plugin(mongoosePaginate)
const Fixture = mongoose.model('Fixture', fixtureSchema)

module.exports = Fixture
