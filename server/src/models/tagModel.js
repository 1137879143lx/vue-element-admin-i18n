const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const tagSchema = new mongoose.Schema({
  name: {
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

tagSchema.plugin(mongoosePaginate)
const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
