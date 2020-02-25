/**
 * @description 微博 view 路由
 * @author guoxiaxing
 */

const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginCheck');

router.get('/', loginRedirect, async (ctx, next) => {
  // 首页渲染
  await ctx.render('index', {});
});

module.exports = router;
