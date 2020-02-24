/**
 * @description user login api test
 * @author guoxiaxing
 */

const server = require('../server');

// 用户信息

const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
};

// 存储cookie
let COOKIE = '';

// 注册

test('注册一个用户 应该成功', async () => {
  const res = await server.post('/api/user/register').send(testUser);
  expect(res.body.errno).toBe(0);
});

// 重复注册

test('重复注册一个用户 应该失败', async () => {
  const res = await server.post('/api/user/register').send(testUser);
  expect(res.body.errno).not.toBe(0);
});

// 查询用户是否存在

test('查询注册的用户 应该存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName });
  expect(res.body.errno).toBe(0);
});

// json schema 检测

test('json schema 检测 非法数据应该失败', async () => {
  const res = await server.post('/api/user/register').send({
    userName: 123,
    password: '1',
    gender: 'aaa'
  });
  expect(res.body.errno).not.toBe(0);
});

// 登陆

test('登陆注册一个用户 应该成功', async () => {
  const res = await server.post('/api/user/login').send({
    userName,
    password
  });
  expect(res.body.errno).toBe(0);
  // 获取cookie

  COOKIE = res.headers['set-cookie'].join(';');
});

// 修改基本信息 应该成功

test('修改基本信息 应该成功', async () => {
  const res = await server
    .patch('/api/user/changeInfo')
    .send({
      nickName: 'test name',
      city: 'test city',
      picture: 'test.png'
    })
    .set('cookie', COOKIE);
  expect(res.body.errno).toBe(0);
});

// 修改密码 应该成功

test('修改密码 应该成功', async () => {
  const res = await server
    .patch('/api/user/changePassword')
    .send({
      password,
      newPassword: `${Date.now()}_hahaha`
    })
    .set('cookie', COOKIE);
  expect(res.body.errno).toBe(0);
});

// 删除

test('删除注册一个用户 应该成功', async () => {
  const res = await server.post('/api/user/delete').set('cookie', COOKIE);
  expect(res.body.errno).toBe(0);
});

// 退出登陆

test('退出登陆  应该成功', async () => {
  const res = await server.post('/api/user/logout').set('cookie', COOKIE);
  expect(res.body.errno).toBe(0);
});

// 删除用户后再次查询用户 应该不存在

test('删除用户后再次查询用户 应该不存在', async () => {
  const res = await server.post('/api/user/isExist').send({ userName });
  expect(res.body.errno).not.toBe(0);
});
