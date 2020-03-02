/**
 * @description 用户关系 service
 * @author guoxiaxing
 */

const { User, UserRelation } = require('../db/model/index');
const { formatUser } = require('./_format');
const Sequelize = require('sequelize');

/**
 * 获取用户的粉丝
 * @param {number} followerId
 */
async function getUserByFollwers(followerId) {
  const result = await User.findAndCountAll({
    attributes: ['id', 'userName', 'nickName', 'picture'],
    order: [['id', 'desc']],
    include: [
      {
        model: UserRelation,
        where: {
          followerId,
          userId: {
            [Sequelize.Op.ne]: followerId
          }
        }
      }
    ]
  });
  let userList = result.rows.map(row => row.dataValues);
  userList = formatUser(userList);
  return {
    count: result.count,
    userList
  };
}

/**
 * 获取用户的关注人
 * @param {number} userId
 */
async function getFollwersByUser(userId) {
  const result = await UserRelation.findAndCountAll({
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['id', 'userName', 'nickName', 'picture']
      }
    ],
    where: {
      userId,
      followerId: {
        [Sequelize.Op.ne]: userId
      }
    }
  });
  let userList = result.rows.map(row => row.dataValues);
  userList = userList.map(item => {
    let user = item.user.dataValues;
    user = formatUser(user);
    return user;
  });
  return {
    count: result.count,
    userList
  };
}

/**
 * 添加关注
 * @param {number} userId
 * @param {number} followerId
 */
async function addFollower(userId, followerId) {
  const result = await UserRelation.create({
    userId,
    followerId
  });
  return result.dataValues;
}

/**
 * 取消关注
 * @param {number} userId
 * @param {number} followerId
 */
async function deleteFollower(userId, followerId) {
  const result = await UserRelation.destroy({
    where: {
      userId,
      followerId
    }
  });
  return result > 0;
}

module.exports = {
  getUserByFollwers,
  addFollower,
  deleteFollower,
  getFollwersByUser
};
