/**
 * @description 加密方法
 * @author guoxiaxing
 */

const crypto = require('crypto');

// 密钥

const SECRET_KEY = 'GUOXX03gxx**';

/**
 * md5 加密
 * @param {string} content 明文
 */
function _md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

/**
 * 加密函数
 * @param {string} content 明文
 */
function doCrypto(content) {
  const str = `password=${content}&key=${SECRET_KEY}`;
  return _md5(str);
}

module.exports = doCrypto;
