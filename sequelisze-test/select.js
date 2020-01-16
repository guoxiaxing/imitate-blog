const { User, Blog } = require("./model");

!(async function() {
  // findOne查一条
  const zhangsan = await User.findOne({
    // where 条件
    where: {
      userName: "zhangsan"
    }
  });
  // 与创建相同，通过dataValues来获取值
  //   console.log(("zhangsan: ", zhangsan.dataValues));
  // 查询特定的列
  const zhangsanName = await User.findOne({
    // 将想要查询的列添加到数组中
    attributes: ["userName", "nickName"],
    where: {
      userName: "zhangsan"
    }
  });
  console.log("zhangsanName: ", zhangsanName.dataValues);
  // 查询一个列表,返回一个数组，即使只有一个记录也是一个数组的形式返回
  const zhangsanBlogList = await Blog.findAll({
    where: {
      userid: 3
    },
    // 是一个数组，可以有很多的排序条件
    order: [["id", "desc"]]
  });
  console.log(
    "zhangsanBlogList: ",
    zhangsanBlogList.map(blog => blog.dataValues)
  );
  // 分页;
  const blogListPage = await Blog.findAll({
    limit: 2,
    offset: 2,
    order: [["id", "desc"]]
  });
  console.log(
    "blogListPage: ",
    blogListPage.map(blog => blog.dataValues)
  );
  // 查询总数;
  const blogListCount = await Blog.findAndCountAll({
    limit: 2,
    offset: 2,
    order: [["id", "desc"]]
  });
  console.log(
    "blogListCount: ",
    blogListCount.count,
    blogListCount.rows.map(blog => blog.dataValues)
  ); //count属性返回所有数据的总条数，不考虑分页,rows表示这个分页中的数据
  // 联表查询1
  //   要想通过blog表查询user信息，则必须要定义
  // Blog.belongsTo(User, {
  //   // 表示blog表属于user表，将blog表的userid关联到user表的id，不指定则默认关联id
  //   foreignKey: "userid"
  // });
  // 表示查处zhangsan的博客;
  const blogWithUser = await Blog.findAndCountAll({
    order: [["id", "desc"]],
    include: [
      {
        model: User,
        attributes: ["userName", "nickName"],
        where: {
          userName: "zhangsan"
        }
      }
    ]
  });
  console.log(
    "blogWithUser: ",
    blogWithUser.count,
    blogWithUser.rows.map(blog => {
      const blogVal = blog.dataValues;
      // blogVal.user表示每一个博客对应的user信息，这个user是我们的user模型的名称
      blogVal.user = blogVal.user.dataValues;
      return blogVal;
    })
  );
  // 联表查询2
  // 要想通过user表查询blog信息，则必须要定义
  // User.hasMany(Blog, {
  //   // 表示blog表属于user表，将blog表的userid关联到user表的id，不指定则默认关联id
  //   foreignKey: "userid"
  // });
  // 二者的另一个有没有无所谓
  // 一个用户可能有多个博客

  const userWithBlog = await User.findAndCountAll({
    attributes: ["userName", "nickName"],
    include: [
      {
        model: Blog
      }
    ]
  });

  //   console.log(userWithBlog.count);
  console.log(
    "userWithBlog: ",
    userWithBlog.count,
    userWithBlog.rows.map(user => {
      const userVal = user.dataValues;
      // userVal.blog表示每一个用户对应的blog信息，这个blog是我们的blog模型的名称
      userVal.blogs = userVal.blogs.map(blog => blog.dataValues);
      return userVal;
    })
  );
})();
