const { User, Blog } = require("./model");
!(async function() {
  // update方法需要传递两个参数，第一个参数是要修改的内容，第二个参数是where条件
  const updateRes = await User.update(
    {
      nickName: "张三"
    },
    {
      where: {
        userName: "zhangsan"
      }
    }
  );
  // 返回一个数组表示这次操作的影响行数
  console.log("updateRes: ", updateRes); // [ 1 ]
})();
