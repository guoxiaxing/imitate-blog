/**
 * @description 数据模型入口文件
 * @author guoxiaxing
 */

const User = require('./User');
const Blog = require('./Blog');

// 关联外键 关系：多对一的关系 多个博客属于一个user

Blog.belongsTo(User, {
  // 表示blog表属于user表，将blog表的userId关联到user表的id，不指定则默认关联id
  foreignKey: 'userId'
});
module.exports = {
  User,
  Blog
};
