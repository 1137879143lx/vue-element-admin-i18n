const mongoose = require('mongoose')

/**
 * @typedef {Object} MaterialInfo
 * @property {string} materialCode - The code of the material.
 * @property {string} materialName - The name of the material.
 * @property {string} version - The version of the material.
 * @property {number} quantity - The quantity of the material.
 * @property {string} [material] - The type of material.
 * @property {string} [processing] - The processing type.
 * @property {string} [cuttingSize] - The size of the cutting.
 * @property {number} [cuttingQuantity] - The quantity of the cutting.
 * @property {string} [processingSteps] - The processing steps.
 * @property {number} [programmingFee] - The programming fee.
 * @property {string} [urgency] - The urgency of the order.
 * @property {number} [additionalToolingFee] - The additional tooling fee.
 * @property {number} [materialFee] - The material fee.
 * @property {number} [surfaceArea] - The surface area of the material.
 * @property {number} [volume] - The volume of the material.
 * @property {number} [roughWeight] - The rough weight of the material.
 * @property {number} [netWeight] - The net weight of the material.
 * @property {number} [surfaceTreatmentFee] - The surface treatment fee.
 * @property {number} [packagingInspectionFee] - The packaging inspection fee.
 * @property {number} [expressFee] - The express fee.
 * @property {number} [managementFee] - The management fee.
 * @property {number} [profit] - The profit.
 * @property {number} [unitPriceTaxIncluded] - The unit price including tax.
 * @property {number} [totalPriceTaxIncluded] - The total price including tax.
 * @property {Date} [replyDeliveryDate] - The delivery date.
 */

/**
 * @typedef {Object} SalesQuote
 * @property {string} orderNumber - The order number.
 * @property {string} customer - The customer name.
 * @property {Date} orderDate - The order date.
 * @property {Date} expectedDeliveryDate - The expected delivery date.
 * @property {string} [note] - The note.
 * @property {string} status - The status of the order.
 * @property {string} deliveryAddress - The delivery address.
 * @property {MaterialInfo[]} materialInfo - The material information.
 */

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

const SalesQuote = mongoose.model('SalesQuote', salesQuoteSchema)

module.exports = SalesQuote
