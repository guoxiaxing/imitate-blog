/**
 * @description 微博首页路由
 * @author guoxiaxing
 */

const router = require('koa-router')();

const { loginCheck } = require('../../middlewares/loginCheck');

const { create } = require('../../controller/blog-home');

const blogValidate = require('../../validator/blog');
const { getValidator } = require('../../middlewares/validator');

const xss = require('xss');

router.prefix('/api/blog');

router.post(
  '/create',
  loginCheck,
  getValidator(blogValidate),
  async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    ctx.body = await create({ userId, content: xss(content), image });
  }
);

module.exports = router;
