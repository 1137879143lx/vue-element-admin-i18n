const express = require('express')
const cors = require('cors')

// 引入路由
const userRouter = require('./routes/User')
const customerRouter = require('./routes/Customer')
const suppliersRouter = require('./routes/Supplier')
const cutting_stock_list = require('./routes/Cutting_stock_list')
const pr_ReplenishmentRequisition = require('./routes/Pr_ReplenishmentRequisition')

// 创建服务器
const app = express()
// 跨域
app.use(cors())
// 解析post请求
app.use(express.urlencoded({ extended: false }))
// 解析json

app.use(express.json())
// 静态资源托管
app.use(express.static('./public'))
// 路由

app.use('/api/user', userRouter) // // 引入路由
app.use('/api/customer', customerRouter) // // 使用路由
app.use('/api/suppliers', suppliersRouter) // // 使用路由
app.use('/api/cutting_stock_list', cutting_stock_list) // // 使用路由
app.use('/api/pr_ReplenishmentRequisition', pr_ReplenishmentRequisition) // // 使用路由

//
//
// 错误处理
app.use((err, req, res, next) => {
  res.status(500).json({
    code: 500,
    msg: err.message
  })
})
// 监听端口
app.listen(3000, () => {
  console.log('server is running at http://localhost: 3000')
})
