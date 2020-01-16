/**
 * test 文件的文件名 *.test.js
 * @description 测试用例 test函数是jest帮我们定义的，第一个参数就是测试用例的title
 * @author guoxiaxing
 *
 */

function sum(a, b) {
  return a + b;
}

test("10 + 20 = 30", () => {
  const res = sum(10, 20);
  // 断言 期望结果是 30
  expect(res).toBe(30);
  // 不等于
  //   expect(res).not.toBe(30);
});
