const Router = require('koa-router')

const {
  create
} = require('../controller/user.controller')

const {
  verifyUser,
  passwordHandle
} = require('../middleware/user.middleware')

const userRouter = new Router({
  prefix: '/users'
})

userRouter.post('/', verifyUser, passwordHandle, create)

module.exports = userRouter