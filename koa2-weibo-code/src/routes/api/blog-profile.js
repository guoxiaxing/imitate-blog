/**
 * @description 个人主页路由
 * @author guoxiaxing
 */

const router = require('koa-router')();
const { loginCheck } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { getBlogListStr } = require('../../util/blog');

router.prefix('/api/profile');

// 加载更多

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  pageIndex = parseInt(pageIndex);
  const result = await getProfileBlogList(userName, pageIndex);

  // 渲染为html字符串
  result.data.blogListTpl = getBlogListStr(result.data.blogList);
  ctx.body = result;
});

module.exports = router;
