const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

// 配置 multer 中间件
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})
const upload = multer({ storage })

// 上传图片
router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file.filename)
  try {
    const fileUrl = `/uploads/${req.file.filename}`
    res.json({ fileUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: '上传失败' })
  }
})

module.exports = router
