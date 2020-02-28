/**
 * @description 首页 blog file api test
 * @author guoxiaxing
 */

const server = require('../server');
const { COOKIE, USERNAME } = require('../testUserInfo');

// 加载数据 应该成功

test('加载数据 应该成功', async () => {
  const res = await server
    .get(`/api/profile/loadMore/${USERNAME}/0`)
    .set('Cookie', COOKIE);
  expect(res.body.errno).toBe(0);
  const data = res.body.data;
  expect(data).toHaveProperty('blogList');
  expect(data).toHaveProperty('count');
  expect(data).toHaveProperty('pageIndex');
  expect(data).toHaveProperty('pageSize');
  expect(data).toHaveProperty('isEmpty');
});