/**
 * @description user service
 * @author guoxiaxing
 */

const { User } = require('../db/model/index');

const { formatUser } = require('./_format');

/**
 * 获取用户信息
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  };
  if (password) {
    Object.assign(whereOpt, { password });
  }
  // 查询

  const result = await User.findOne({
    // attributes 不写则查出user模型的所有列
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  });
  if (result === null) {
    // 未找到
    return result;
  }
  // 格式化

  return formatUser(result.dataValues);
}

/**
 * 创建用户
 * @param {userName} 用户名
 * @param {password} 密码
 * @param {gender} 性别
 * @param {nickName} 昵称
 */
async function createUser({
  userName,
  password,
  gender = 3,
  nickName = userName
}) {
  const result = await User.create({
    userName,
    password,
    nickName,
    gender
  });
  return result.dataValues;
}

module.exports = {
  getUserInfo,
  createUser
};
