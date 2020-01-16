const { User, Blog } = require("./model");
!(async function() {
  // 删除一条博客

  const deleteBlogRes = await Blog.destroy({
    where: {
      id: 4
    }
  });
  // 返回一个数字，表示删除的条数
  console.log("deleteBlogRes:", deleteBlogRes); // 1

  // 删除一个用户
  // 设置了外键，所以也会删除这个用户所对应的博客，需要修改外键的属性为cascade,因为这个是sequenlize帮我们设置的外键,
  // 默认update时为cascade，但是delete时为no action，所以我们需要设置delete时也为cascade

  const deleteUserRes = await User.destroy({
    where: {
      userName: "lisi"
    }
  });
  console.log("deleteUserRes: ", deleteUserRes);
})();
