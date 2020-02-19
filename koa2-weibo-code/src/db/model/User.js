/**
 * @description 用户数据模型
 * @author guoxiaxing
 */

const seq = require('../seq');
const { STRING, DECIMAL } = require('../types');

// 创建user模型
// 这个user对应数据库中的users表，这里写user是因为sequelize会默认在表名的后面加上一个s
const User = seq.define('user', {
  // id会自动创建并且设为主键，自动自增
  userName: {
    type: STRING, // 对应数据库中的varchar(255)
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: STRING, // 对应数据库中的varchar(255)
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING, // 对应数据库中的varchar(255)
    comment: '昵称' //注释
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '姓名，1-男，2-女，3-保密'
  },
  picture: {
    type: STRING,
    comment: '头像，图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
  // 自动创建createAt和updateAt
});

module.exports = User;
