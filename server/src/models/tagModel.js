const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
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

const Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag
