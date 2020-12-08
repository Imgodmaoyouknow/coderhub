const errorTypes = require('../constants/error-type')

const errorHandler = (error, ctx) => {
  const body = { success: false }
  ctx.status = 400
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      body.msg = '用户名和密码不能为空'
      break
    case errorTypes.NAME_TOO_LONG:
      body.msg = '用户名不能超过30个字符'
      break
    case errorTypes.PASSWORD_TOO_LONG:
      body.msg = '密码不能超过50个字符'
      break
    case errorTypes.USER_IS_EXISTS:
      ctx.status = 409
      body.msg = '用户名已存在'
      break
    case errorTypes.USER_DOES_NOT_EXISTS:
      ctx.status = 409
      body.msg = '用户名不存在'
      break
    case errorTypes.PASSWORD_ERROR:
      ctx.status = 401
      body.msg = '密码错误'
      break
    default:
      ctx.status = 404
  }
  ctx.body = body
}

module.exports = errorHandler
