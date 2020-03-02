/**
 * @description 首页 blog create api test
 * @author guoxiaxing
 */

const server = require('../server');
const { Z_COOKIE } = require('../testUserInfo');
// 存储微博id
let BLOG_ID = '';

// 用户信息

const content = `content_${Date.now()}`;
const image = '/image.png';
const testBlog = {
  content,
  image
};

// 注册

test('创建一条微博 应该成功', async () => {
  const res = await server
    .post('/api/blog/create')
    .send(testBlog)
    .set('Cookie', Z_COOKIE);
  expect(res.body.errno).toBe(0);
  expect(res.body.data.content).toBe(content);
  expect(res.body.data.image).toBe(image);

  // 记录微博ID
  BLOG_ID = res.body.data.id;
});

// 加载数据 应该成功

test('加载数据 应该成功', async () => {
  const res = await server.get('/api/blog/loadMore/0').set('Cookie', Z_COOKIE);
  expect(res.body.errno).toBe(0);
  const data = res.body.data;
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('count');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('pageSize');
  expect(data).toHaveProperty('isEmpty');
});
