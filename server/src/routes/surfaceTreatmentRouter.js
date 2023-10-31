const express = require('express')
const router = express.Router()
const SurfaceTreatment = require('../models/surfaceTreatmentModel')

// 获取所有表面处理
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10

  try {
    const surfaceTreatments = await SurfaceTreatment.find()
      .skip((page - 1) * limit)
      .limit(limit)
    const count = await SurfaceTreatment.countDocuments()
    res.json({
      code: 200,
      count,
      data: surfaceTreatments
    })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 获取单个表面处理
router.get('/:id', getSurfaceTreatment, (req, res) => {
  res.json({
    code: 200,
    data: {
      surfaceTreatment: res.surfaceTreatment
    }
  })
})

// 创建表面处理
router.post('/', async (req, res) => {
  const surfaceTreatment = new SurfaceTreatment({
    name: req.body.name,
    price: req.body.price
  })

  try {
    const existingSurfaceTreatment = await SurfaceTreatment.findOne({ name: req.body.name })
    if (existingSurfaceTreatment) {
      return res.json({ code: 400, message: '表面处理名称已存在' })
    }
    const newSurfaceTreatment = await surfaceTreatment.save()
    res.json({
      code: 200,
      message: '创建成功',
      data: {
        surfaceTreatment: newSurfaceTreatment
      }
    })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 更新表面处理
router.patch('/:id', getSurfaceTreatment, async (req, res) => {
  if (req.body.name != null) {
    res.surfaceTreatment.name = req.body.name
  }

  if (req.body.price != null) {
    res.surfaceTreatment.price = req.body.price
  }

  try {
    const updatedSurfaceTreatment = await res.surfaceTreatment.save()
    res.json({
      code: 200,
      message: '更新成功',
      data: {
        surfaceTreatment: updatedSurfaceTreatment
      }
    })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 删除表面处理
router.delete('/:id', async (req, res) => {
  try {
    const deletedSurfaceTreatment = await SurfaceTreatment.findByIdAndDelete(req.params.id)
    if (!deletedSurfaceTreatment) {
      return res.json({ code: 404, message: '未找到表面处理' })
    }
    res.json({
      code: 200,
      message: '删除成功',
      data: {
        message: '表面处理已删除'
      }
    })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})
// 中间件函数，用于获取单个表面处理
async function getSurfaceTreatment(req, res, next) {
  let surfaceTreatment
  try {
    surfaceTreatment = await SurfaceTreatment.findById(req.params.id)
    if (surfaceTreatment == null) {
      return res.status(404).json({ message: '未找到表面处理' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.surfaceTreatment = surfaceTreatment
  next()
}

module.exports = router
