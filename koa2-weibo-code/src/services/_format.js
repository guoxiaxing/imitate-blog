/**
 * @description 数据格式化
 * @author guoxiaxing
 */
const { DEFAULT_PICTURE, REG_FOR_AT_WHO } = require('../conf/const');

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
 * 格式化对象内容
 * @param {Object} obj 微博信息
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content;
  obj.contentFormat = obj.contentFormat.replace(
    REG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      return `<a href='/profile/${userName}'>@${nickName}</a>`;
    }
  );
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
    return list.map(_formatDBTime).map(_formatContent);
  }
  // 单个对象
  let result = list;
  result = _formatDBTime(result);
  result = _formatContent(result);
  return result;
}

module.exports = {
  formatUser,
  formatBlog
};
