const router = require('koa-router')()
const { login, register } = require('../controller/user')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/users')

// 获取用户信息
router.get('/getUserInfo', loginCheck, async (ctx, next) => {
  ctx.body = {
    errno: 0,
    data: ctx.session.userInfo
  }
})

// 登录
router.post('/login', async (ctx, nex) => {
  // 获取登录信息
  const { username, password } = ctx.request.body
  // 验证登录
  const res = await login(username, password)
  if (res) {
    // 登录成功

    // 设置session
    ctx.session.userInfo = {
      username
    }

    // 返回
    ctx.body = {
      errno: 0
    }
  } else {
    // 登录失败
    ctx.body = {
      errno: -1
    }
  }
})

// 注册
router.post('/register', async (ctx, next) => {
  // 获取注册信息
  const userInfo = ctx.request.body
  // 提交注册
  try {
    const newUser = await register(userInfo) // 调用 controller
    // 成功
    ctx.body = {
      errno: 0,
      data: newUser
    }
  } catch (ex) {
    // 失败
    console.error('注册失败')
    ctx.body = {
      errno: -1,
      message: '注册失败'
    }
  }
})

module.exports = router
