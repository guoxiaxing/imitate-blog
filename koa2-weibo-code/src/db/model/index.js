/**
 * @description 数据模型入口文件
 * @author guoxiaxing
 */

const User = require('./User');
const Blog = require('./Blog');
const UserRelation = require('./UserRelation');
const AtRelation = require('./AtRelation');

// 关联外键 关系：多对一的关系 多个博客属于一个user

Blog.belongsTo(User, {
  // 表示blog表属于user表，将blog表的userId关联到user表的id，不指定则默认关联id
  foreignKey: 'userId'
});

UserRelation.belongsTo(User, {
  foreignKey: 'followerId'
});

User.hasMany(UserRelation, {
  foreignKey: 'userId'
});

Blog.belongsTo(UserRelation, {
  foreignKey: 'userId',
  targetKey: 'followerId'
});

Blog.hasMany(AtRelation, {
  foreignKey: 'blogId'
});
module.exports = {
  User,
  Blog,
  UserRelation,
  AtRelation
};
