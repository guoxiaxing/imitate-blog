/**
 * @description 用户关系数据模型
 * @author guoxiaxing
 */

const seq = require('../seq');
const { STRING, INTEGER, TEXT } = require('../types');

const UserRelation = seq.define('userRelation', {
  userId: {
    type: INTEGER,
    allowNull: false,
    comment: '用户 id'
  },
  followerId: {
    type: INTEGER,
    allowNull: false,
    comment: '被关注用户 id'
  }
});

module.exports = UserRelation;
