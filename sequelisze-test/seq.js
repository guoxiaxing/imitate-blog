const Sequelize = require("sequelize");

// 参数，数据库名称，用户，密码，第四个配置项，需要声明所操作的数据库，因为它可以操作很多种数据库

const conf = {
  host: "localhost",
  dialect: "mysql"
};

// 线上需要使用链接池

conf.pool = {
  max: 5,
  min: 0,
  idle: 10000 // 单位ms 如果一个连接池10s中没有被使用，他就会被释放
};

const seq = new Sequelize("koa2-weibo-blog", "root", "123456", conf);

// 测试链接

// seq
//   .authenticate()
//   .then(() => {
//     console.log("ok");
//   })
//   .catch(() => {
//     console.log("err");
//   });

module.exports = seq;
