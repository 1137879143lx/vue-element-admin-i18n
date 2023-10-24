const express = require('express')
const cors = require('cors')
// 解析 token 的中间件
const expressjwt = require('express-jwt')

const config = require('./config/config')
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
app.use(express.static('../public'))
// 路由

// 这里解析验证token的中间件
app.use(
  expressjwt({ secret: config.jwtSecretKey }).unless({
    path: ['/api/user/login', '/api/user/create']
  })
)
// 123333
app.use('/api/user', userRouter) // // 引入路由
app.use('/api/customer', customerRouter) // // 使用路由
app.use('/api/suppliers', suppliersRouter) // // 使用路由
app.use('/api/cutting_stock_list', cutting_stock_list) // // 使用路由
app.use('/api/pr_ReplenishmentRequisition', pr_ReplenishmentRequisition) // // 使用路由

//
// 解析错误中间件
// eslint-disable-next-line space-before-function-paren
app.use(function (err, req, res, next) {
  console.log(req.body, req.headers)
  // 省略其它代码...
  console.log('错误的中间件?' + err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') {
    return res.json({ status: 505, msg: '身份认证失败,请重新登录' })
  }
  // 未知错误...
})

// 监听端口
app.listen(3333, () => {
  console.log('server is running at http://localhost: 3333')
})
