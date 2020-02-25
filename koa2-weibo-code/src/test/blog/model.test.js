/**
 * @description blog model 单元测试
 * @author guoxiaxing
 */

const { Blog } = require('../../db/model/index');

test('blog 模型的各个属性是否符合预期', () => {
  // 数据模型的build方法不会真正的创建数据存储到数据库 它只会创建一个内存的实例
  const blog = Blog.build({
    userId: 1,
    content: '123',
    image: '/test.png'
  });

  // 验证各个属性
  expect(blog.userId).toBe(1);
  expect(blog.content).toBe('123');
  expect(blog.image).toBe('/test.png');
});
