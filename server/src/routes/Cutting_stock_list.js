/* eslint-disable space-before-function-paren */
// 下料列表ruoter 增删改查
const express = require('express')
const router = express.Router()
const Cutting_stock_list = require('../models/Cutting_stock_list')

// 修改下料列表
router.put('/cutting_stock_list/:id', async (req, res) => {
  const cutting_stock_list = await Cutting_stock_list.findByIdAndUpdate(req.params.id, req.body)
  res.send(cutting_stock_list)
})

// 删除下料列表
router.delete('/cutting_stock_list/:id', async (req, res) => {
  await Cutting_stock_list.findByIdAndDelete(req.params.id)
  res.send({ status: 200 })
})
// 查询下料列表
router.get('/cutting_stock_list', async (req, res) => {
  const cutting_stock_list = await Cutting_stock_list.find()
  res.send(cutting_stock_list)
})
// 增加下料列表
router.post('/cutting_stock_list', async (req, res) => {
  const cutting_stock_list = await Cutting_stock_list.create(req.body)
  res.send(cutting_stock_list)
})
module.exports = router
