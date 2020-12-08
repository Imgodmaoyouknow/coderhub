const userService = require('../service/user.service')

const errorTypes = require('../constants/error-type')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body

  // 2. 判断用户名或密码是否为空
  if (!(name && password)) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  
  // 2.5 判断用户名和密码长度
  if (name.length > 30) {
    const error = new Error(errorTypes.NAME_TOO_LONG)
    return ctx.app.emit('error', error, ctx)
  }

  if (password.length > 50) {
    const error = new Error(errorTypes.PASSWORD_TOO_LONG)
    return ctx.app.emit('error', error, ctx)
  }

  // 3. 判断用户是否存在
  const result = await userService.getByName(name)
  if (result.length === 0) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 4. 判断密码是否和数据库中一致（加密）
  const dataUser = result[0]
  if (dataUser.password !== md5password(password)) {
    const error = new Error(errorTypes.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin
}