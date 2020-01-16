/**
 * @description 链接 redis 的方法
 * @author guoxiaxing
 */

const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on("error", err => {
  console.error(err);
});

/**
 *
 * @param {string} key key
 * @param {string} val val
 * @param {number} timeout 过期时间 单位 s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === "object") {
    redisClient.set(key, JSON.stringify(val));
    redisClient.expire(key, timeout);
  }
}

/**
 *
 * @param {string} key key
 */
function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (val === null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};
