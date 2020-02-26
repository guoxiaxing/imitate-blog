/**
 * @description 时间相关的工具函数
 * @author guoxiaxing
 */

const { format } = require('date-fns');

/**
 * 格式化时间
 * @param {string} str
 */
function dateFormat(str) {
  return format(new Date(str), 'MM.dd HH:mm');
}

module.exports = {
  dateFormat
};
