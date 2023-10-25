const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const purchaseRequestSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    required: true
  },
  planDeliveryDate: {
    type: Date,
    required: true
  },
  applicationDate: {
    type: Date,
    default: Date.now
  },
  expectedDeliveryDate: {
    type: Date,
    required: true
  },
  applicationNote: {
    type: String
  },
  applicationStatus: {
    type: String,
    required: true
  },
  approver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  materialList: [
    {
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
      description: {
        type: String
      },
      unit: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      note: {
        type: String
      },
      recommendedSupplier: {
        type: String
      },
      estimatedUnitPrice: {
        type: Number
      },
      attachmentPaths: [
        {
          type: String
        }
      ],
      images: [
        {
          type: String
        }
      ]
    }
  ]
})

purchaseRequestSchema.plugin(mongoosePaginate)
const PurchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema)

module.exports = PurchaseRequest
