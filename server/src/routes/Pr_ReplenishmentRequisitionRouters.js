const express = require('express')
const router = express.Router()
const Pr_ReplenishmentRequisition = require('../models/Pr_ReplenishmentRequisitionModel')

// 获取所有补料申请单（带分页和查询参数）
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...query } = req.query // 获取分页和查询参数
    const options = {
      page: parseInt(page),
      limit: parseInt(limit)
    }
    const model = await Pr_ReplenishmentRequisition.paginate(query, options) // 查询所有补料申请单（带分页和查询参数）
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err) // 调用错误处理中间件
  }
})

// 获取单个补料申请单
router.get('/:id', async (req, res, next) => {
  try {
    const model = await Pr_ReplenishmentRequisition.findById(req.params.id) // 根据 ID 查询单个补料申请单
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err) // 调用错误处理中间件
  }
})

// 新增补料申请单
router.post('/', async (req, res, next) => {
  try {
    const model = await Pr_ReplenishmentRequisition.create(req.body) // 创建新的补料申请单
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err) // 调用错误处理中间件
  }
})

// 更新补料申请单
router.put('/:id', async (req, res, next) => {
  try {
    const model = await Pr_ReplenishmentRequisition.findByIdAndUpdate(req.params.id, req.body, { new: true }) // 根据 ID 更新补料申请单
    res.json({
      code: 200,
      data: model
    })
  } catch (err) {
    next(err) // 调用错误处理中间件
  }
})

// 删除补料申请单
router.delete('/:id', async (req, res, next) => {
  try {
    await Pr_ReplenishmentRequisition.findByIdAndDelete(req.params.id) // 根据 ID 删除补料申请单
    res.json({
      code: 200,
      msg: '删除成功'
    })
  } catch (err) {
    next(err) // 调用错误处理中间件
  }
})

module.exports = router
