const router = require('koa-router')();
const { loginRedirect, loginCheck } = require('../middlewares/loginCheck');
router.get('/', loginRedirect, async (ctx, next) => {
  const session = ctx.session;
  if (session.viewNum == null) {
    session.viewNum = 0;
  }
  session.viewNum++;

  await ctx.render('index', {
    title: 'Hello Koa 2!',
    userData: {
      userInfo: {},
      fansData: {
        count: 0,
        list: []
      },
      followersData: {
        count: 0,
        list: []
      },
      atCount: 0
    },
    blogData: {
      isEmpty: true,
      blogList: [
        {
          id: 1,
          title: 'aaa'
        },
        {
          id: 2,
          title: 'bbb'
        },
        {
          id: 3,
          title: 'ccc'
        }
      ],
      pageSize: 10,
      pageIndex: 1,
      count: 100
    }
  });
});

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', loginCheck, async (ctx, next) => {
  ctx.body = ctx.session;
});

router.get('/profile/:username', async (ctx, next) => {
  const { username } = ctx.params;
  ctx.body = {
    username
  };
});

module.exports = router;
