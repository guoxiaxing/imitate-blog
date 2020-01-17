/**
 * @description 存储配置
 * @author guoxiaxing
 */

const REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
};

const MYSQL_CONF = {
  host: 'localhost',
  dialect: 'mysql',
  user: 'root',
  password: '123456',
  database: 'koa2-weibo-blog',
  port: '3306'
};

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
};
