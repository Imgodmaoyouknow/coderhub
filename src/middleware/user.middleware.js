const errorTypes = require('../constants/error-type')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body
  
  // 2. 判断用户名或者密码不能为空
  if (!(name && password)) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 2. 判断用户名或密码长度
  if (name.length > 30) {
    const error = new Error(errorTypes.NAME_TOO_LONG)
    return ctx.app.emit('error', error, ctx)
  }

  if (password.length > 50) {
    const error = new Error(errorTypes.PASSWORD_TOO_LONG)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户名是否已被注册
  const result = await userService.getByName(name)
  if (result.length > 0) {
    const error = new Error(errorTypes.USER_IS_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const passwordHandle = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  passwordHandle
}