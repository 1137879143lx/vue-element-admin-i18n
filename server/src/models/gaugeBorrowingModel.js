const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const gaugeBorrowingSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true
  },
  gaugeName: {
    type: String,
    required: true
  },
  specification: {
    type: String,
    required: true
  },
  gaugeCode: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  borrowingTime: {
    type: Date,
    required: true
  },
  expectedReturnTime: {
    type: Date,
    required: true
  },
  borrower: {
    type: String,
    required: true
  },
  confirmer: {
    type: String,
    required: true
  },
  note: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

gaugeBorrowingSchema.plugin(mongoosePaginate)
const GaugeBorrowing = mongoose.model('GaugeBorrowing', gaugeBorrowingSchema)

module.exports = GaugeBorrowing
