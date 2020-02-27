/**
 * @description 用户关系的controller
 * @author guoxiaixing
 */

const { getUserByFollwers } = require('../services/user-relation');
const { SuccessModel } = require('../model/ResModel');
/**
 * 获取当前用户的粉丝
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  const { count, userList } = await getUserByFollwers(userId);
  return new SuccessModel({
    fansCount: count,
    fansList: userList
  });
}

module.exports = {
  getFans
};
