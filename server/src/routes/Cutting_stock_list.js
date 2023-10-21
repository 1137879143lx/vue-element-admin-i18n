/* eslint-disable space-before-function-paren */
// 下料列表ruoter 增删改查
const express = require('express')
const router = express.Router()
const Cutting_stock_list = require('../models/Cutting_stock_list')

// 修改下料列表
router.put('/cutting_stock_list/:id', async (req, res) => {
  const {
    Production_order,
    Material_code,
    Material_name,
    Version,
    Cutting_name,
    Cutting_number,
    Cutting_size,
    Theoretical_dosage,
    Actual_dosage,
    Customer_delivery,
    Cutting_date,
    Cutting_personnel,
    Is_cutting
  } = req.body
  const cutting_stock_list = await Cutting_stock_list.findByIdAndUpdate(req.params.id, {
    Production_order: Production_order,
    Material_code: Material_code,
    Material_name: Material_name,
    Version: Version,
    Cutting_name: Cutting_name,
    Cutting_number: Cutting_number,
    Cutting_size: Cutting_size,
    Theoretical_dosage: Theoretical_dosage,
    Actual_dosage: Actual_dosage,
    Customer_delivery: Customer_delivery,
    Cutting_date: Cutting_date,
    Cutting_personnel: Cutting_personnel,
    Is_cutting: Is_cutting
  })
  res.send(cutting_stock_list)
  const cutting_stock_list2 = await Cutting_stock_list.findByIdAndUpdate(req.params.id, req.body)
  res.send(cutting_stock_list2)
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
