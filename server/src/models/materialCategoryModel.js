const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')
const materialCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

materialCategorySchema.plugin(mongoosePaginate)
const MaterialCategory = db.model('MaterialCategory', materialCategorySchema)

module.exports = MaterialCategory
