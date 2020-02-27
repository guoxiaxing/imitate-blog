/**
 * @description 用户关系 service
 * @author guoxiaxing
 */

const { User, UserRelation } = require('../db/model/index');
const { formatUser } = require('./_format');
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
          followerId
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

module.exports = {
  getUserByFollwers
};
