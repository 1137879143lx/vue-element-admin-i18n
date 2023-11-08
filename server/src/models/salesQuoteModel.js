const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const db = require('../config/db')

// 定义销售报价单模式
const salesQuoteSchema = new mongoose.Schema({
  // 订单号
  orderNumber: {
    type: String,
    required: true
  },
  // 客户名称
  customer: {
    type: String,
    required: true
  },
  // 下单日期
  orderDate: {
    type: Date,
    required: true
  },
  // 备注
  note: {
    type: String
  },
  // 状态
  status: {
    type: String,
    required: true
  },
  // 交货地址
  deliveryAddress: {
    type: String,
    required: true
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now
  },
  // 物料信息
  materialInfo: [
    {
      // 物料编码
      materialCode: {
        type: String,
        required: true
      },
      // 物料名称
      materialName: {
        type: String,
        required: true
      },
      // 版本号
      version: {
        type: String,
        required: true
      },
      // 数量
      quantity: {
        type: Number,
        required: true
      },
      // 材料
      material: {
        type: String
      },
      // 切割尺寸
      cuttingSize: {
        type: String
      },
      // 切割数量
      cuttingQuantity: {
        type: Number
      },
      // 加工步骤
      processingSteps: [
        {
          name: {
            type: String // Process name
          },
          estimatedHours: {
            type: Number
          },
          state: {
            type: String
          },
          price: {
            type: Number
          }
        }
      ],
      Surface_treatment: {
        type: String // 表面处理
      },
      // 编程费用
      programmingFee: {
        type: Number
      },
      // 紧急程度
      urgency: {
        type: String
      },
      // 附加工装费用
      additionalToolingFee: {
        type: Number
      },
      // 材料费用
      materialFee: {
        type: Number
      },
      // 表面积
      surfaceArea: {
        type: Number
      },
      // 体积
      volume: {
        type: Number
      },
      // 毛重
      roughWeight: {
        type: Number
      },
      // 净重
      netWeight: {
        type: Number
      },
      // 表面处理费用
      surfaceTreatmentFee: {
        type: Number
      },
      Estimated_unit_price: {
        type: Number
      },
      // 包装检验费用
      packagingInspectionFee: {
        type: Number
      },
      // 快递费用
      expressFee: {
        type: Number
      },
      // 管理费用
      managementFee: {
        type: Number
      },
      // 利润
      profit: {
        type: Number
      },
      // 含税单价
      unitPriceTaxIncluded: {
        type: Number
      },
      // 含税总价
      totalPriceTaxIncluded: {
        type: Number
      },
      // 回复交货日期
      replyDeliveryDate: {
        type: Date
      },
      // 文件路径
      fullPath: {
        type: String
      },
      image2D: {
        type: String
      },
      image3D: {
        type: String
      }
    }
  ]
})

// 添加分页插件
salesQuoteSchema.plugin(mongoosePaginate)

// 创建销售报价单模型
const SalesQuote = db.model('SalesQuote', salesQuoteSchema)

// 导出销售报价单模型
module.exports = SalesQuote
