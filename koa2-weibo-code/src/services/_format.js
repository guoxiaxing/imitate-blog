/**
 * @description 数据格式化
 * @author guoxiaxing
 */
const { DEFAULT_PICTURE } = require('../conf/const');

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

module.exports = {
  formatUser
};
