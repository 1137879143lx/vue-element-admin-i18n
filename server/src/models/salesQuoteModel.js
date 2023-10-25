const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const salesQuoteSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  },
  expectedDeliveryDate: {
    type: Date,
    required: true
  },
  note: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  deliveryAddress: {
    type: String,
    required: true
  },
  materialInfo: [
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
      quantity: {
        type: Number,
        required: true
      },
      material: {
        type: String
      },
      processing: {
        type: String
      },
      cuttingSize: {
        type: String
      },
      cuttingQuantity: {
        type: Number
      },
      processingSteps: {
        type: String
      },
      programmingFee: {
        type: Number
      },
      urgency: {
        type: String
      },
      additionalToolingFee: {
        type: Number
      },
      materialFee: {
        type: Number
      },
      surfaceArea: {
        type: Number
      },
      volume: {
        type: Number
      },
      roughWeight: {
        type: Number
      },
      netWeight: {
        type: Number
      },
      surfaceTreatmentFee: {
        type: Number
      },
      packagingInspectionFee: {
        type: Number
      },
      expressFee: {
        type: Number
      },
      managementFee: {
        type: Number
      },
      profit: {
        type: Number
      },
      unitPriceTaxIncluded: {
        type: Number
      },
      totalPriceTaxIncluded: {
        type: Number
      },
      replyDeliveryDate: {
        type: Date
      }
    }
  ]
})

salesQuoteSchema.plugin(mongoosePaginate)
const SalesQuote = mongoose.model('SalesQuote', salesQuoteSchema)

module.exports = SalesQuote
