/**
 * @description 数据格式化
 * @author guoxiaxing
 */
const { DEFAULT_PICTURE } = require('../conf/const');

const { dateFormat } = require('../util/dt');

/**
 * 用户默认头像
 * @param {Object} user 用户信息
 */
function _formatUserPicture(user) {
  if (!user.picture) {
    user.picture = DEFAULT_PICTURE;
  }
  return user;
}

/**
 * 格式化对象时间
 * @param {Object} obj 微博信息
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = dateFormat(obj.createdAt);
  obj.updatedAtFormat = dateFormat(obj.updatedAt);
  return obj;
}

/**
 * 格式化用户信息
 * @param {Array | Object} list 用户列表或单个用户
 */
function formatUser(list) {
  if (!list) {
    return list;
  }
  if (Array.isArray(list)) {
    return list.map(_formatUserPicture);
  }
  // 单个对象
  return _formatUserPicture(list);
}

/**
 * 格式化博客信息
 * @param {Array | Object} list 微博列表或单个微博
 */
function formatBlog(list) {
  if (!list) {
    return list;
  }
  if (Array.isArray(list)) {
    return list.map(_formatDBTime);
  }
  // 单个对象
  return _formatDBTime(list);
}

module.exports = {
  formatUser,
  formatBlog
};
