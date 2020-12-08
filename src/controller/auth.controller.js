class authController {
  async auth(ctx, next) {
    ctx.body = '登录成功'
  }
}

module.exports = new authController()