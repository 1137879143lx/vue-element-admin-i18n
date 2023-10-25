const express = require('express')
const cors = require('cors')
const expressjwt = require('express-jwt')
const config = require('./config/config')

// 引入路由模块
const userRouter = require('./routes/User')
const customerRouter = require('./routes/Customer')
const supplierRouter = require('./routes/Supplier')
const cuttingStockListRouter = require('./routes/Cutting_stock_list')
const prReplenishmentRequisitionRouter = require('./routes/Pr_ReplenishmentRequisition')

const app = express()

// 跨域中间件
app.use(cors())

// 解析post请求中间件
app.use(express.urlencoded({ extended: false }))

// 解析json中间件
app.use(express.json())

// 静态资源托管中间件
app.use(express.static('../public'))

// 使用路由模块
app.use('/api/users', userRouter)
app.use('/api/customers', customerRouter)
app.use('/api/suppliers', supplierRouter)
app.use('/api/cutting-stock-list', cuttingStockListRouter)
app.use('/api/pr-replenishment-requisition', prReplenishmentRequisitionRouter)

// 验证token中间件
app.use(
  expressjwt({ secret: config.jwtSecretKey }).unless({
    path: ['/api/users/login', '/api/users/register']
  })
)

// 错误处理中间件
// eslint-disable-next-line space-before-function-paren
app.use(function (err, req, res, next) {
  console.log(req.body, req.headers)
  console.log('错误的中间件?' + err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.json({ status: 505, msg: '身份认证失败,请重新登录' })
  }
  // 未知错误...
})

// 监听端口
app.listen(3333, () => {
  console.log('server is running at http://localhost:3333')
})
