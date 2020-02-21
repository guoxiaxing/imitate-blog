/**
 * @description user model 单元测试
 * @author guoxiaxing
 */

const { User } = require('../../db/model/index');

test('user 模型的各个属性是否符合预期', () => {
  // 数据模型的build方法不会真正的创建数据存储到数据库 它只会创建一个内存的实例
  const user = User.build({
    userName: 'zhangsan',
    password: '123',
    nickName: 'zs',
    // gender:1,
    picture: 'xxx.png',
    city: 'beijing'
  });

  // 假数据进行测试 假如你删掉了user模型的picture 属性 虽然在build的时候传入了picture属性但是由于你在构造模型的时候删除了picture属性 所以
  // 即使传入了也不会被赋值 测试就会报错 如果有一天真的想要删除picture字段则需要在这里也删除
  // 验证各个属性
  expect(user.userName).toBe('zhangsan');
  expect(user.password).toBe('123');
  expect(user.nickName).toBe('zs');
  expect(user.picture).toBe('xxx.png');
  expect(user.city).toBe('beijing');
  expect(user.gender).toBe(3);
});
