const Koa = require('koa');
const path = require('path');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const koaStatic = require('koa-static');
const { REDIS_CONF } = require('./conf/db');

const blogViewRouter = require('./routes/view/blog');
const user = require('./routes/view/user');
const userAPIRouter = require('./routes/api/user');
const profileAPIRouter = require('./routes/api/blog-profile');
const squareAPIRouter = require('./routes/api/blog-square');
const utilsAPIRouter = require('./routes/api/utils');
const BlogHomeAPIRouter = require('./routes/api/blog-home');
const errorRoute = require('./routes/view/error');

// error handler
onErrorConfig = {
  redirect: '/error'
};
onerror(app, onErrorConfig);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
);
app.use(json());
app.use(logger());
// 将我们的根目录设置到public下，也就是访问public/stylesheets/style.css可以通过以下地址直接访问
// http://localhost:3000/stylesheets/style.css
app.use(koaStatic(__dirname + '/public'));
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// session 配置 需要在route之前进行配置

app.keys = ['GXX_19970521_**'];

app.use(
  session({
    key: 'weibo.id', // 也就是cookie的key  默认是koa.id
    prefix: 'weibo:sess:', //redis key的前缀 默认是 koa:sess:
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 单位ms
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
);

// routes
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(BlogHomeAPIRouter.routes(), BlogHomeAPIRouter.allowedMethods());
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods());
app.use(squareAPIRouter.routes(), squareAPIRouter.allowedMethods());
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods());
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods());
app.use(errorRoute.routes(), errorRoute.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
