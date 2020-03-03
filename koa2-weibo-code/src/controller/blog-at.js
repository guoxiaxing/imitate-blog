/**
 * @description 微博at关系 controller
 * @author guoxiaxing
 */

const {
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
} = require('../services/at-relation');
const { SuccessModel } = require('../model/ResModel');

const { PAGE_SIZE } = require('../conf/const');
/**
 * 获取at数量
 * @param {number} userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId);
  return new SuccessModel({ count });
}

/**
 * 获取@ 用户的微博列表
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  });
  const blogList = result.blogList;

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  });
}

/**
 * 标记为已读
 * @param {number} userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false });
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
};
