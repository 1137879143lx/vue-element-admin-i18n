const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

const purchaseRequestSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true
    // 唯一的
  }, // 订单号
  createdBy: {
    type: String,
    required: true
  }, // 创建者
  department: {
    type: String,
    required: true
  }, // 部门
  urgency: {
    type: String,
    required: true
  }, // 紧急程度
  planDeliveryDate: {
    type: Date,
    required: true
  }, // 计划交货日期
  applicationDate: {
    type: Date,
    default: Date.now
  }, // 申请日期
  expectedDeliveryDate: {
    type: Date,
    required: true
  }, // 预期交货日期
  applicationNote: {
    type: String
  }, // 申请备注
  applicationStatus: {
    type: String,
    required: true
  }, // 申请状态
  approver: {
    type: String
  }, // 审批者
  materialList: [
    {
      materialCode: {
        type: String,
        required: true
      }, // 材料代码
      materialName: {
        type: String,
        required: true
      }, // 材料名称
      version: {
        type: String,
        required: true
      }, // 版本
      description: {
        type: String
      }, // 描述
      unit: {
        type: String,
        required: true
      }, // 单位
      quantity: {
        type: Number,
        required: true
      }, // 数量
      note: {
        type: String
      }, // 备注
      recommendedSupplier: {
        type: String
      }, // 推荐供应商
      estimatedUnitPrice: {
        type: Number
      }, // 预计单价
      attachmentPaths: [
        {
          type: String
        }
      ], // 附件路径
      images2D: {
        type: String
      }, // 2D图片
      images3D: {
        type: String
      } // 3D图片
    }
  ]
})

purchaseRequestSchema.plugin(mongoosePaginate)
const PurchaseRequest = db.model('PurchaseRequest', purchaseRequestSchema)

module.exports = PurchaseRequest
