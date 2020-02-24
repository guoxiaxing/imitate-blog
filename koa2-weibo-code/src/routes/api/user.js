/**
 * @description user API 路由
 * @author guoxiaxing
 */
const router = require('koa-router')();
const {
  isExist,
  register,
  login,
  del,
  changeInfo
} = require('../../controller/user');
const userValidate = require('../../validator/user');
const { getValidator } = require('../../middlewares/validator');
const { loginCheck } = require('../../middlewares/loginCheck');

router.prefix('/api/user');

// 注册路由

router.post('/register', getValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({ userName, password, gender });
});

// 用户名是否存在

router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body;
  ctx.body = await isExist(userName);
  return ctx.body;
});

// 登陆路由

router.post('/login', getValidator(userValidate), async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = await login(ctx, userName, password);
});

// 删除路由

router.post('/delete', loginCheck, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.body = await del(userName);
});

// 修改用户信息路由

router.patch(
  '/changeInfo',
  loginCheck,
  getValidator(userValidate),
  async (ctx, next) => {
    const { nickName, city, picture } = ctx.request.body;
    ctx.body = await changeInfo(ctx, { nickName, city, picture });
  }
);

module.exports = router;
