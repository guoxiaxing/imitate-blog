/**
 * @description 用户数据模型
 * @author guoxiaxing
 */

const seq = require('../seq');
const { STRING, INTEGER, TEXT } = require('../types');

// 创建Blog模型
// 这个Blog对应数据库中的blogs表，这里写blog是因为sequelize会默认在表名的后面加上一个s
const Blog = seq.define('blog', {
  // id会自动创建并且设为主键，自动自增
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  content: {
    type: TEXT,
    allowNull: false,
    comment: '微博内容'
  },
  image: {
    type: STRING,
    comment: '图片地址' //注释
  }
  // 自动创建createAt和updateAt
});

module.exports = Blog;
