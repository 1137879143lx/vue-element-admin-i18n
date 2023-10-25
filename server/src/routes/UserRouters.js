/* eslint-disable object-curly-spacing */
// 导入express
const express = require('express')
// 创建路由对象
const router = express.Router()
// 导入用户集合构造函数
const User = require('../models/UserModel')
// 导入moment模块
// const moment = require('moment')
const jwt = require('jsonwebtoken') // 导入jsonwebtoken模块
const config = require('../config/config') // 导入配置文件

// 创建用户swagger写注释 //配置文件

router.post('/create', (req, res) => {
  // 接收参数
  const { username, password, email, mobile, name, roles, avatar, description } = req.body
  // 判断参数是否为空
  if (!username || !password) {
    return res.send({
      code: 401,
      msg: '用户名或密码不能为空'
    })
  }
  // 查询数据库中是否存在该用户
  User.findOne({ username })
    .then((data) => {
      // 如果存在
      if (data) {
        return res.send({
          code: 402,
          msg: '用户名已存在'
        })
      }
      // 如果不存在
      // 创建用户
      return User.create({ username, password, email, mobile, name, roles, avatar, description })
    })
    .then((data) => {
      // 响应
      res.send({
        code: 200,
        msg: '用户创建成功'
      })
    })
    .catch((err) => {
      res.send({
        code: 500,
        msg: err.message
      })
    })
})

// 登录请求swagger写注释
router.post('/login', (req, res) => {
  // 接收参数
  const { username, password } = req.body
  // 判断参数是否为空
  if (!username || !password) {
    return res.json({
      code: 401,
      msg: '用户名或密码不能为空'
    })
  }
  // 查询数据库中是否存在该用户    //返回给用户数据 tonken

  User.findOne({ username, password })
    .then((data) => {
      // 如果存在
      if (data) {
        // 生成token
        const token =
          'Bearer ' +
          jwt.sign(
            {
              id: data._id,
              username: data.username,
              email: data.email,
              mobile: data.mobile,
              roles: data.roles,
              avatar: data.avatar,
              name: data.name,
              description: data.description
            },
            config.jwtSecretKey,
            { expiresIn: config.expiresIn }
          )
        return res.json({
          code: 200,
          msg: '登录成功',
          data: {
            token: token
          }
        })
      }
      // 如果不存在
      console.log(username, password)
      return res.json({
        code: 402,
        msg: '用户名或密码错误'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})
// eslint-disable-next-line space-before-function-paren
router.get('/info', async (req, res) => {
  // // console.log(req.user);//获取解析 authorization 后的数据  请求头里面 不是token 而是authorization
  // {"code":200,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
  console.log(req.user) // eslint-disable-next-line space-before-function-paren
  const user = req.user
  // res.status(200).send(123)
  // 根据ID查询用户信息

  res.json({
    code: 200,
    data: {
      roles: user.roles,
      name: user.name,
      avatar: user.avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      introduction: user.description || 'I am a super administrator'
    }
  })
})

// swagger修改用户swagger写注释
router.post('/update', (req, res) => {
  // 接收参数
  const { username, password, age, role, mobile, email, description, avatar } = req.body
  // 判断参数是否为空
  if (!username) {
    return res.json({
      code: 401,
      msg: '用户名不能为空'
    })
  }
  // 查询数据库中是否存在该用户
  User.findOne({ username })
    .then((data) => {
      // 如果存在
      if (data) {
        // 修改用户信息
        return User.updateOne({ username }, { password, age, role, mobile, email, description, avatar })
      }
      // 如果不存在
      return res.json({
        code: 402,
        msg: '用户名不存在'
      })
    })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '修改用户信息成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// swagger删除用户swagger写注释
router.get('/delete', (req, res) => {
  // 接收参数
  const { username } = req.query
  // 判断参数是否为空
  if (!username) {
    return res.json({
      code: 401,
      msg: '用户名不能为空'
    })
  }
  // 查询数据库中是否存在该用户
  User.findOne({ username })
    .then((data) => {
      // 如果存在
      if (data) {
        // 删除用户
        return User.deleteOne({ username })
      }
      // 如果不存在
      return res.json({
        code: 402,
        msg: '用户名不存在'
      })
    })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '删除用户成功'
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})
// 获取用户列表
router.get('/list', (req, res) => {
  // 查询数据库中的用户列表
  User.find()
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '获取用户列表成功',
        data
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})
// 用户退出 退出成功
router.post('/logout', (req, res) => {
  res.json({
    code: 200,
    msg: '退出成功'
  })
})

// 查询本月有多少个用户注册
router.get('/month', (req, res) => {
  // 获取当前时间
  const now = new Date()
  // 获取本月第一天的时间
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  // 获取本月最后一天的时间
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  // 查询数据库中的用户列表
  User.find({ createdAt: { $gte: start, $lte: end } })
    .then((data) => {
      // 响应
      res.json({
        code: 200,
        msg: '获取本月用户注册数量成功',
        data: data.length
      })
    })
    .catch((err) => {
      res.json({
        code: 500,
        msg: err.message
      })
    })
})

// 导出路由
module.exports = router
