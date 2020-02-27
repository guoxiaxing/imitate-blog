/**
 * @description 微博 view 路由
 * @author guoxiaxing
 */

const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { isExist } = require('../../controller/user');

const { getSquareBlogList } = require('../../controller/blog-square');

const { getFans } = require('../../controller/user-relation');

router.get('/', loginRedirect, async (ctx, next) => {
  // 首页渲染
  await ctx.render('index', {});
});

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
  const { userName } = ctx.session.userInfo;
  ctx.redirect(`/profile/${userName}`);
});

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
  // 获取已登陆的用户信息
  const myUserInfo = ctx.session.userInfo;
  const myUserName = myUserInfo.userName;
  let curUserInfo;
  // 获取微博第一页数据
  const { userName: curUserName } = ctx.params;
  const isMe = myUserName === curUserName;
  if (isMe) {
    curUserInfo = myUserInfo;
  } else {
    const isExistUser = await isExist(curUserName);
    if (isExistUser.errno !== 0) {
      return;
    }
    curUserInfo = isExistUser.data;
  }
  const result = await getProfileBlogList(curUserName, 0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

  const fansResult = await getFans(curUserInfo.id);
  const { fansCount, fansList } = fansResult.data;
  await ctx.render('profile', {
    blogData: { isEmpty, blogList, pageSize, pageIndex, count },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: { count: fansCount, list: fansList },
      followersData: { count: 0, list: [] }
    }
  });
});

// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
  // 获取微博数据，第一页
  const result = await getSquareBlogList(0);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {};

  await ctx.render('square', {
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  });
});

module.exports = router;
