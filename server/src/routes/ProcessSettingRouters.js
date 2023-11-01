const express = require('express')
const router = express.Router()
const ProcessSetting = require('../models/ProcessSettingModel')

// 获取所有工序设置
router.get('/', async (req, res) => {
  console.log('获取所有工序设置')
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const processSettings = await ProcessSetting.find().skip(skip).limit(limit)
    const count = await ProcessSetting.countDocuments()

    res.json({ code: 200, count: count, data: processSettings })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 获取单个工序设置
router.get('/:id', getProcessSetting, (req, res) => {
  res.json({ code: 200, data: res.processSetting })
})

// 创建工序设置
router.post('/', async (req, res) => {
  const processSetting = new ProcessSetting({
    name: req.body.name,
    code: req.body.code,
    resourceGroup: req.body.resourceGroup,
    price: req.body.price,
    isOutsourced: req.body.isOutsourced,
    isInspected: req.body.isInspected,
    status: req.body.status
  })

  try {
    const newProcessSetting = await processSetting.save()
    res.json({ code: 200, data: newProcessSetting })
  } catch (err) {
    res.json({ code: 400, message: err.message })
  }
})

// 更新工序设置
router.put('/:id', getProcessSetting, async (req, res) => {
  if (req.body.name != null) {
    res.processSetting.name = req.body.name
  }
  if (req.body.code != null) {
    res.processSetting.code = req.body.code
  }
  if (req.body.resourceGroup != null) {
    res.processSetting.resourceGroup = req.body.resourceGroup
  }
  if (req.body.price != null) {
    res.processSetting.price = req.body.price
  }
  if (req.body.isOutsourced != null) {
    res.processSetting.isOutsourced = req.body.isOutsourced
  }
  if (req.body.isInspected != null) {
    res.processSetting.isInspected = req.body.isInspected
  }
  if (req.body.status != null) {
    res.processSetting.status = req.body.status
  }

  try {
    const updatedProcessSetting = await res.processSetting.save()
    res.json({ code: 200, data: updatedProcessSetting })
  } catch (err) {
    res.json({ code: 400, message: err.message })
  }
})

// 删除工序设置
router.delete('/:id', async (req, res) => {
  try {
    const deletedProcessSetting = await ProcessSetting.findByIdAndDelete(req.params.id)
    if (!deletedProcessSetting) {
      return res.json({ code: 404, message: '未找到工序设置' })
    }
    res.json({ code: 200, message: '工序设置已删除' })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 中间件函数：获取单个工序设置
async function getProcessSetting(req, res, next) {
  let processSetting
  try {
    processSetting = await ProcessSetting.findById(req.params.id)
    if (processSetting == null) {
      return res.json({ code: 404, message: '未找到工序设置' })
    }
  } catch (err) {
    return res.json({ code: 500, message: err.message })
  }

  res.processSetting = processSetting
  next()
}

module.exports = router
