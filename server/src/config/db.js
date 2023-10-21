// 使用monbgoose连接数据库
const config = require('../config/config') // 导入配置文件

const mongoose = require('mongoose') // 引入mongoose
const db = mongoose.createConnection(config.database, {
  useNewUrlParser: true, // 使用新的url解析器
  useUnifiedTopology: true // 使用新的服务器发现和监视引擎
})
db.on('error', () => {
  console.log('数据库连接失败')
})
db.on('open', () => {
  console.log('数据库连接成功')
})
module.exports = db
