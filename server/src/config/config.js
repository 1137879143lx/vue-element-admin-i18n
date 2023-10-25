var config = {
  database: 'mongodb://localhost:27017/liuxu_mes', // 使用哪个数据库
  // 加密和解密 Token 的密钥
  jwtSecretKey: 'ai xiao su ^_^',
  // token 的有效期
  expiresIn: '7d'
}
module.exports = config
