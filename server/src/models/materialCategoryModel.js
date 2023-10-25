const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const materialCategorySchema = new mongoose.Schema({
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

materialCategorySchema.plugin(mongoosePaginate)
const MaterialCategory = mongoose.model('MaterialCategory', materialCategorySchema)

module.exports = MaterialCategory
