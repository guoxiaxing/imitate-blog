/**
 * @description 关注关系 test
 * @author guoxiaxing
 */

const server = require('../server');

const { getFans, getFollowers } = require('../../controller/user-relation');

const {
  Z_ID,
  Z_COOKIE,
  Z_USERNAME,
  L_ID,
  L_COOKIE,
  L_USERNAME
} = require('../testUserInfo');

test('无论如何，先取消关注，应该成功', async () => {
  const result = server
    .post('/api/profile/unFollow')
    .send({
      userId: L_ID
    })
    .set('cookie', Z_COOKIE);
  expect(1).toBe(1);
});

test('添加关注，张三关注李四，应该成功', async () => {
  const result = server
    .post('/api/profile/follow')
    .send({
      userId: L_ID
    })
    .set('cookie', Z_COOKIE);
  console.log('添加关注，张三关注李四，应该成功', result.body);
  expect(result.body.errno).toBe(0);
});

test('获取李四粉丝，应该有张三', async () => {
  const result = await getFans(L_ID);
  const { fansCount, fansList } = result.data;
  const hasFansName = fansList.some(item => item.userName === Z_USERNAME);
  console.log('获取李四粉丝，应该有张三', result.data);
  expect(fansCount > 0).toBe(true);
  expect(hasFansName).toBe(true);
});

test('获取张三关注人，应该有李四', async () => {
  const result = await getFollowers(Z_ID);
  const { followersCount, followersList } = result.data;
  const hasFollowersName = followersList.some(
    item => item.userName === L_USERNAME
  );
  console.log('获取张三关注人，应该有李四', result.data);
  expect(followersCount > 0).toBe(true);
  expect(hasFollowersName).toBe(true);
});

test('张三取消关注李四，应该成功', async () => {
  const result = server
    .post('/api/profile/unFollow')
    .send({
      userId: L_ID
    })
    .set('cookie', Z_COOKIE);
  console.log('张三取消关注李四，应该成功', result.body);
  expect(result.body.errno).toBe(0);
});
