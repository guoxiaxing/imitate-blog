/**
 * @description 微博 view 路由
 * @author guoxiaxing
 */

const router = require('koa-router')();

const { loginRedirect } = require('../../middlewares/loginCheck');
const { getProfileBlogList } = require('../../controller/blog-profile');
const { isExist } = require('../../controller/user');

const { getSquareBlogList } = require('../../controller/blog-square');

const { getFans, getFollowers } = require('../../controller/user-relation');

const { getHomeBlogList } = require('../../controller/blog-home');

const {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
} = require('../../controller/blog-at');

router.get('/', loginRedirect, async (ctx, next) => {
  const userInfo = ctx.session.userInfo;
  const { id: userId } = userInfo;

  // 获取第一页数据
  const result = await getHomeBlogList(userId);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

  // 获取粉丝
  const fansResult = await getFans(userId);
  const { fansCount, fansList } = fansResult.data;

  // 获取关注人列表
  const followersResult = await getFollowers(userId);
  const { followersCount, followersList } = followersResult.data;

  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId);
  const { count: atCount } = atCountResult.data;

  await ctx.render('index', {
    userData: {
      userInfo,
      fansData: {
        count: fansCount,
        list: fansList
      },
      followersData: {
        count: followersCount,
        list: followersList
      },
      atCount
    },
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  });
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

  const followersResult = await getFollowers(curUserInfo.id);
  const { followersCount, followersList } = followersResult.data;

  const amIFollowed = fansList.some(item => item.userName === myUserName);
  await ctx.render('profile', {
    blogData: { isEmpty, blogList, pageSize, pageIndex, count },
    userData: {
      userInfo: curUserInfo,
      isMe,
      fansData: { count: fansCount, list: fansList },
      amIFollowed,
      followersData: { count: followersCount, list: followersList }
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

// 广场
router.get('/at-me', loginRedirect, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo;
  // 获取 @ 数量
  const atCountResult = await getAtMeCount(userId);
  const { count: atCount } = atCountResult.data;

  // 获取第一页数据
  const result = await getAtMeBlogList(userId);
  const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

  await ctx.render('atMe', {
    atCount,
    blogData: {
      isEmpty,
      blogList,
      pageSize,
      pageIndex,
      count
    }
  });
  // 标记为已读
  if (atCount > 0) {
    await markAsRead(userId);
  }
});

module.exports = router;
