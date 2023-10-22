// 创建user模型
const mongoose = require('mongoose')
const moment = require('moment')
// Your code here
const db = require('../config/db')
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    minlength: [2, '用户名长度不能小于2'],
    maxlength: [20, '用户名长度不能大于20']
  },
  password: {
    type: String,
    required: [true, '密码不能为空'],
    minlength: [6, '密码长度不能小于6'],
    maxlength: [20, '密码长度不能大于20']
  },
  name: {
    type: String,
    required: [false, '姓名不能为空']
  }, //
  // 数组类型
  role: {
    type: [String] //
  }, // 角色

  // 创建时间 改为东8区时间  加上8小时
  created: {
    type: Date,
    default: Date.now() + 60 * 60 * 8 * 1000,
    get: (v) => moment(v).utcOffset(0).format('YYYY-MM-DD HH:mm:ss')
  },

  enable_flag: {
    type: String,
    default: 'Y'
  }, // 是否启用
  mobile: {
    type: String
  },
  email: {
    type: String
  }, // 邮箱
  description: {
    type: String,
    default: null
  }, // 描述
  avatar: {
    type: String,
    default: null
  } // 头像
})

// 当数据修改时，自动更新时间
// eslint-disable-next-line space-before-function-paren
userSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { created: Date.now() + 60 * 60 * 8 * 1000 })
  next()
})

const User = db.model('User', userSchema)
module.exports = User
