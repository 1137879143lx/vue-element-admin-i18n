const express = require('express')
const cors = require('cors')
const expressjwt = require('express-jwt')
const config = require('./config/config')

// 引入路由模块
const userRouter = require('./routes/UserRouters')
const customerRouter = require('./routes/CustomerRouters')
const supplierRouter = require('./routes/SupplierRouters')
const cuttingStockListRouter = require('./routes/Cutting_stock_listRouters')
const prReplenishmentRequisitionRouter = require('./routes/Pr_ReplenishmentRequisitionRouters')

const app = express()

// 跨域中间件
app.use(cors())

// 解析post请求中间件
app.use(express.urlencoded({ extended: false }))

// 解析json中间件
app.use(express.json())

// 静态资源托管中间件
app.use(express.static('../public'))
// 路由

// 验证token中间件
app.use(
  expressjwt({ secret: config.jwtSecretKey }).unless({
    path: ['/api/user/login', '/api/user/create']
  })
)

// 解析错误中间件
// eslint-disable-next-line space-before-function-paren
app.use(function (err, req, res, next) {
  console.log(req.body, req.headers)
  console.log('错误的中间件?' + err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.json({ status: 505, msg: '身份认证失败,请重新登录' })
  }
  // 未知错误...
  next(err) // fix for Problem 1
})

app.use('/api/user', userRouter) // 引入路由
app.use('/api/customer', customerRouter) // // 使用路由
app.use('/api/suppliers', supplierRouter) // // 使用路由
app.use('/api/cutting_stock_list', cuttingStockListRouter) // // 使用路由
app.use('/api/pr_ReplenishmentRequisition', prReplenishmentRequisitionRouter) // // 使用路由

// 监听端口
app.listen(3333, () => {
  console.log('server is running at http://localhost:3333')
})
