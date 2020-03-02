/**
 * @description 微博首页路由
 * @author guoxiaxing
 */

const router = require('koa-router')();

const { loginCheck } = require('../../middlewares/loginCheck');

const { create } = require('../../controller/blog-home');

const blogValidate = require('../../validator/blog');
const { getValidator } = require('../../middlewares/validator');

const { getHomeBlogList } = require('../../controller/blog-home');
const { getBlogListStr } = require('../../util/blog');

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

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex); // 转换 number 类型
  const { id: userId } = ctx.session.userInfo;
  const result = await getHomeBlogList(userId, pageIndex);
  // 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList);

  ctx.body = result;
});

module.exports = router;
