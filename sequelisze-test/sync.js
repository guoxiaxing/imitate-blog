const seq = require("./seq");

require("./model");

// 测试链接

seq
  .authenticate()
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("err");
  });

// 同步
seq.sync({ force: true }).then(() => {
  console.log("sync ok");
  process.exit();
});
