/**
 * @description 用户关系的controller
 * @author guoxiaixing
 */

const {
  getUserByFollwers,
  addFollower,
  deleteFollower,
  getFollwersByUser
} = require('../services/user-relation');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  addFollowerFailInfo,
  deleteFollowerFailInfo
} = require('../model/ErrorMessage');
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

/**
 * 获取当前用户的关注人
 * @param {number} userId 用户 id
 */
async function getFollowers(userId) {
  const { count, userList } = await getFollwersByUser(userId);
  return new SuccessModel({
    followersCount: count,
    followersList: userList
  });
}

/**
 * 关注
 * @param {number} myUserId
 * @param {number} curUserId
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollower(myUserId, curUserId);
    return new SuccessModel();
  } catch (e) {
    return new ErrorModel(addFollowerFailInfo);
  }
}

/**
 * 取消关注
 * @param {number} myUserId
 * @param {number} curUserId
 */
async function unFollow(myUserId, curUserId) {
  const result = await deleteFollower(myUserId, curUserId);
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(deleteFollowerFailInfo);
}

module.exports = {
  getFans,
  getFollowers,
  follow,
  unFollow
};
