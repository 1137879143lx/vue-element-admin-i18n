const express = require('express')
const router = express.Router()
const SalesQuote = require('../models/salesQuoteModel')

// Create
router.post('/', async (req, res) => {
  const salesQuote = new SalesQuote(req.body)
  try {
    await salesQuote.save()
    res.json({ code: 200, data: salesQuote, message: 'Sales quote created successfully.' })
  } catch (error) {
    res.json({ code: 400, data: error, message: 'Error creating sales quote.' })
  }
})

// Read with pagination
router.get('/', async (req, res) => {
  try {
    let { page = 1, limit } = req.query
    console.log(req.query)
    page = parseInt(page)
    limit = limit ? parseInt(limit) : undefined
    const skip = limit ? (page - 1) * limit : 0
    const salesQuotes = await SalesQuote.find({}).skip(skip).limit(limit)
    const total = await SalesQuote.countDocuments({})
    res.json({
      code: 200,
      data: salesQuotes,
      count: total,
      currentPage: page,
      message: 'Sales quotes retrieved successfully.'
    })
  } catch (error) {
    res.json({ code: 500, data: error, message: 'Error retrieving sales quotes.' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const salesQuote = await SalesQuote.findById(req.params.id)
    if (!salesQuote) {
      return res.json({ code: 404, data: 'Not Found', message: 'Sales quote not found.' })
    }
    res.json({ code: 200, data: salesQuote, message: 'Sales quote retrieved successfully.' })
  } catch (error) {
    res.json({ code: 500, data: error, message: 'Error retrieving sales quote.' })
  }
})

// Update
router.put('/:id', async (req, res) => {
  try {
    const salesQuote = await SalesQuote.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!salesQuote) {
      return res.json({ code: 404, data: 'Not Found', message: 'Sales quote not found.' })
    }
    res.json({ code: 200, data: salesQuote, message: 'Sales quote updated successfully.' })
  } catch (error) {
    res.json({ code: 400, data: error, message: 'Error updating sales quote.' })
  }
})

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const salesQuote = await SalesQuote.findByIdAndDelete(req.params.id)
    if (!salesQuote) {
      return res.json({ code: 404, data: 'Not Found', message: 'Sales quote not found.' })
    }
    res.json({ code: 200, data: salesQuote, message: 'Sales quote deleted successfully.' })
  } catch (error) {
    res.json({ code: 500, data: error, message: 'Error deleting sales quote.' })
  }
})

module.exports = router
