/* eslint-disable space-before-function-paren */
const express = require('express')
const router = express.Router()
const UnitModel = require('../models/unitModel')

// GET /units
router.get('/', async (req, res) => {
  try {
    const units = await UnitModel.find()
    res.status(200).json({ code: 200, data: units })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

// GET /units/:id
router.get('/:id', getUnit, (req, res) => {
  res.status(200).json({ code: 200, data: res.unit })
})

// POST /units
router.post('/', async (req, res) => {
  const unit = new UnitModel({
    content: req.body.content,
    createdBy: req.body.createdBy
  })

  try {
    const newUnit = await unit.save()
    res.status(200).json({ code: 200, data: newUnit })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// PATCH /units/:id
router.patch('/:id', getUnit, async (req, res) => {
  if (req.body.content != null) {
    res.unit.content = req.body.content
  }

  try {
    const updatedUnit = await res.unit.save()
    res.status(200).json({ code: 200, data: updatedUnit })
  } catch (err) {
    res.status(400).json({ code: 400, message: err.message })
  }
})

// DELETE /units/:id
router.delete('/:id', getUnit, async (req, res) => {
  try {
    await res.unit.remove()
    res.status(200).json({ code: 200, message: 'Unit deleted' })
  } catch (err) {
    res.status(500).json({ code: 500, message: err.message })
  }
})

async function getUnit(req, res, next) {
  let unit

  try {
    unit = await UnitModel.findById(req.params.id)
    if (unit == null) {
      return res.status(404).json({ code: 404, message: 'Unit not found' })
    }
  } catch (err) {
    return res.status(500).json({ code: 500, message: err.message })
  }

  res.unit = unit
  next()
}

module.exports = router
