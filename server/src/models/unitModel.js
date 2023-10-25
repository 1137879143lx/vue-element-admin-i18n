const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const unitSchema = new mongoose.Schema({
  content: {
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

unitSchema.plugin(mongoosePaginate)

const Unit = mongoose.model('Unit', unitSchema)

module.exports = Unit
