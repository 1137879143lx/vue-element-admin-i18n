const mongoose = require('mongoose')
/**
 * Mongoose schema for Purchase Request model
 * @typedef {Object} PurchaseRequestSchema
 * @property {string} orderNumber - The order number of the purchase request
 * @property {mongoose.Schema.Types.ObjectId} createdBy - The ID of the user who created the purchase request
 * @property {string} department - The department associated with the purchase request
 * @property {string} urgency - The urgency level of the purchase request
 * @property {Date} planDeliveryDate - The planned delivery date of the purchase request
 * @property {Date} applicationDate - The date the purchase request was submitted (defaults to current date)
 * @property {Date} expectedDeliveryDate - The expected delivery date of the purchase request
 * @property {string} applicationNote - Additional notes for the purchase request
 * @property {string} applicationStatus - The status of the purchase request
 * @property {mongoose.Schema.Types.ObjectId} approver - The ID of the user who approved the purchase request
 * @property {Array} materialList - An array of materials associated with the purchase request
 * @property {string} materialList.materialCode - The code of the material
 * @property {string} materialList.materialName - The name of the material
 * @property {string} materialList.version - The version of the material
 * @property {string} materialList.description - The description of the material
 * @property {string} materialList.unit - The unit of the material
 * @property {number} materialList.quantity - The quantity of the material
 * @property {string} materialList.note - Additional notes for the material
 * @property {string} materialList.recommendedSupplier - The recommended supplier for the material
 * @property {number} materialList.estimatedUnitPrice - The estimated unit price of the material
 * @property {Array} materialList.attachmentPaths - An array of attachment paths associated with the material
 * @property {Array} materialList.images - An array of images associated with the material
 */
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

const PurchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema)

module.exports = PurchaseRequest
