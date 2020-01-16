// 创建

const { User, Blog } = require("./model");

!(async function() {
  // 创建用户

  const zhangsan = await User.create({
    userName: "zhangsan",
    password: "123",
    nickName: "张三"
  });

  // dataValues得到创建的记录结果
  console.log("zhangsan:", zhangsan.dataValues);
  // 获取某一条具体的数据
  const zhangsanId = zhangsan.dataValues.id;

  const lisi = await User.create({
    userName: "lisi",
    password: "123",
    nickName: "李四"
  });

  const lisiId = lisi.dataValues.id;

  // 创建博客

  const blog1 = await Blog.create({
    title: "标题1",
    content: "内容1",
    userid: zhangsanId
  });

  const blog2 = await Blog.create({
    title: "标题2",
    content: "内容2",
    userid: zhangsanId
  });

  const blog3 = await Blog.create({
    title: "标题3",
    content: "内容3",
    userid: lisiId
  });
  const blog4 = await Blog.create({
    title: "标题4",
    content: "内容4",
    userid: lisiId
  });
})();
