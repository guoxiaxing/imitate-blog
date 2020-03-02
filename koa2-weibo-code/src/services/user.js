/**
 * @description user service
 * @author guoxiaxing
 */

const { User } = require('../db/model/index');

const { formatUser } = require('./_format');

const { addFollower } = require('./user-relation');

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
  const data = result.dataValues;

  // 自己关注自己 为了方便在首页的时候查看数据

  addFollower(data.id, data.id);

  return data;
}

/**
 * 删除用户
 * @param {string} userName 用户名
 */
async function deleteUser(userName) {
  // 返回删除的行数
  const result = await User.destroy({
    where: {
      userName
    }
  });
  return result > 0;
}

/**
 * 更新用户
 * @param {userName} 用户名
 * @param {password} 密码
 * @param {city} 城市
 * @param {nickName} 昵称
 */
async function updateUser(
  { newPassword, newNickName, newPicture, newCity },
  { userName, password }
) {
  // 拼接修改内容
  const updateData = {};
  if (newPassword) {
    updateData.password = newPassword;
  }
  if (newNickName) {
    updateData.nickName = newNickName;
  }
  if (newCity) {
    updateData.city = newCity;
  }
  if (newPicture) {
    updateData.picture = newPicture;
  }
  // 拼接查询条件

  const whereOpt = {
    userName
  };
  if (password) {
    whereOpt.password = password;
  }

  // 执行修改
  const result = await User.update(updateData, {
    where: whereOpt
  });
  return result[0] > 0;
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
};
