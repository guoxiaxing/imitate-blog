/**
 * @description 微博数据缓存
 * @author guoxiaxing
 */

const { get, set } = require('./_redis');

const { getBlogListByUser } = require('../services/blog');

// redis key prefix
const KEY_PREFIX = 'weibo:square:';

/**
 * 获取微博广场页信息
 * @param {number} pageIndex
 * @param {number} pageSize
 */
async function getSquareCacheList(pageIndex, pageSize) {
  const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`;
  const cacheResult = await get(key);
  if (cacheResult) {
    return cacheResult;
  }
  const result = await getBlogListByUser({ pageIndex, pageSize });
  set(key, result, 60);
  return result;
}

module.exports = {
  getSquareCacheList
};
