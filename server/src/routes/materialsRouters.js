/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Material = require('../models/materialModel')

// GET /materials 获取所有物料
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query
  const skip = (page - 1) * limit

  try {
    const materials = await Material.find(query).skip(skip).limit(limit)
    const count = await Material.countDocuments(query)
    const totalPages = Math.ceil(count / limit)

    res.status(200).json({ code: 200, data: materials, page, totalPages })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// GET /materials/:id 获取指定 ID 的物料
router.get('/:id', getMaterial, (req, res) => {
  res.status(200).json({ code: 200, data: res.material })
})

// POST /materials 创建新物料
router.post('/', async (req, res) => {
  const material = new Material(req.body)

  try {
    const newMaterial = await material.save()
    res.status(201).json({ code: 200, data: newMaterial })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// PATCH /materials/:id 更新指定 ID 的物料
router.patch('/:id', getMaterial, async (req, res) => {
  Object.keys(req.body).forEach((key) => {
    if (res.material[key] !== undefined) {
      res.material[key] = req.body[key]
    }
  })

  try {
    const updatedMaterial = await res.material.save()
    res.status(200).json({ code: 200, data: updatedMaterial })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// DELETE /materials/:id 删除指定 ID 的物料
router.delete('/:id', getMaterial, async (req, res) => {
  try {
    await res.material.remove()
    res.status(200).json({ code: 200, message: 'Material deleted' })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// Middleware function to get material by ID
async function getMaterial(req, res, next) {
  let material

  try {
    material = await Material.findById(req.params.id)
    if (material == null) {
      return res.status(404).json({ code: 404, message: 'Material not found' })
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message })
  }

  res.material = material
  next()
}

module.exports = router
