/* eslint-disable space-before-function-paren */
// 补料申请路由

const express = require('express')
const router = express.Router()
const Pr_ReplenishmentRequisition = require('../models/Pr_ReplenishmentRequisition')

// 获取所有补料申请单
router.get('/', async (req, res, next) => {
  try {
    const model = await Pr_ReplenishmentRequisition.find()
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err)
  }
})

// 获取单个补料申请单
router.get('/:id', async (req, res, next) => {
  try {
    const model = await Pr_ReplenishmentRequisition.findById(req.params.id)
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err)
  }
})

// 新增补料申请单
router.post('/', async (req, res, next) => {
  try {
    const model = await Pr_ReplenishmentRequisition.create(req.body)
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err)
  }
})

// 删除补料申请单
router.delete('/:id', async (req, res, next) => {
  try {
    await Pr_ReplenishmentRequisition.findByIdAndDelete(req.params.id, req.body)
    res.json({
      code: 200,
      msg: '删除成功'
    })
  } catch (err) {
    next(err)
  }
})

// 导出模型
module.exports = router
