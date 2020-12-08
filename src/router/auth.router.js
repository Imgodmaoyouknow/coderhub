const Router = require('koa-router');

const authRouter = new Router({ prefix: '/auth' })

const {
  auth
} = require('../controller/auth.controller')

const { verifyLogin } = require('../middleware/auth.middleware')

authRouter.post('/', verifyLogin, auth)

module.exports = authRouter