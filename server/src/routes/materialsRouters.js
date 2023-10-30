/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const Material = require('../models/materialModel')

// GET /materials 获取所有物料
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query // 解构请求参数，获取页码、每页数量和查询条件
  console.log(req.query)
  const skip = (page - 1) * limit // 计算需要跳过的文档数量

  try {
    const materials = await Material.find(query).skip(skip).limit(limit) // 查询物料列表
    const count = await Material.countDocuments(query) // 查询符合条件的文档数量
    // const totalPages = Math.ceil(count / limit) // 计算总页数

    res.json({ code: 200, data: materials, page, count }) // 返回查询结果、页码和总页数
  } catch (err) {
    res.json({ code: 500, message: err.message }) // 返回错误信息
  }
})

// GET /materials/search 搜索物料
// GET /materials/search 搜索物料
router.get('/search', async (req, res) => {
  const query = Object.fromEntries(
    Object.entries(req.query)
      .filter(([key, value]) => value)
      .map(([key, value]) => [key, { $regex: String(value), $options: 'i' }])
  )

  try {
    const materials = await Material.find(query)
    res.json({ code: 200, data: materials })
  } catch (err) {
    res.json({ code: 400, message: err.message })
  }
})
// POST /materials 创建新物料或更新已有物料
router.post('/', async (req, res) => {
  const material = new Material(req.body) // 创建新物料对象
  try {
    const existingMaterial = await Material.findOne({ _id: material.id }) // 查找已有物料
    if (existingMaterial) {
      // 如果已有物料存在，则更新该物料（除了 ID 以外的其他属性）
      existingMaterial.name = material.name
      existingMaterial.description = material.description
      existingMaterial.price = material.price
      existingMaterial.image = material.image
      existingMaterial.category = material.category
      existingMaterial.unit = material.unit
      existingMaterial.supplier = material.supplier
      existingMaterial.stock = material.stock
      existingMaterial.status = material.status
      existingMaterial.remark = material.remark
      existingMaterial.updatedAt = Date.now()

      const updatedMaterial = await existingMaterial.save() // 将更新后的物料保存到数据库中
      res.json({ code: 200, data: updatedMaterial }) // 返回成功信息和更新后的物料对象
    } else {
      // 如果已有物料不存在，则创建新物料
      const newMaterial = await material.save() // 将新物料对象保存到数据库中
      res.json({ code: 200, data: newMaterial }) // 返回成功信息和新物料对象
    }
  } catch (err) {
    res.json({ code: 400, message: err.message }) // 返回错误信息
  }
})

// PUT /materials/:id 更新指定 ID 的物料
// PUT /materials/:id 更新指定 ID 的物料
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { _id, ...updates } = req.body

  try {
    const material = await Material.findById(_id)
    if (!material) {
      return res.json({ code: 404, message: '物料不存在' })
    }

    Object.assign(material, updates, { updatedAt: Date.now() })

    const updatedMaterial = await material.save()
    res.json({ code: 200, data: updatedMaterial })
  } catch (err) {
    res.json({ code: 400, message: err.message })
  }
})

// DELETE /materials/:id 删除指定 ID 的物料
router.delete('/:id', async (req, res) => {
  try {
    const result = await Material.deleteOne({ _id: req.params.id })

    if (result.deletedCount === 0) {
      return res.json({ code: 404, message: 'Material not found' })
    }

    res.json({ code: 200, message: 'Material deleted' })
  } catch (err) {
    res.json({ code: 500, message: err.message })
  }
})

// 中间件函数，用于获取指定 ID 的物料并将其存储在 res.material 中
async function getMaterial(req, res, next) {
  let material

  try {
    material = await Material.findById(req.params.id) // 查找指定 ID 的物料
    if (material == null) {
      return res.json({ code: 404, message: 'Material not found' }) // 返回错误信息
    }
  } catch (err) {
    return res.json({ code: 500, message: err.message }) // 返回错误信息
  }

  res.material = material // 将物料对象赋值给 res.material
  next() // 调用下一个中间件函数
}

module.exports = router // 导出路由器对象
