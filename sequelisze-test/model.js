const sequelize = require("sequelize");
const seq = require("./seq");

// 创建user模型
// 这个user对应数据库中的users表，这里写user是因为sequelize会默认在表名的后面加上一个s
const User = seq.define("user", {
  // id会自动创建并且设为主键，自动自增
  userName: {
    type: sequelize.STRING, // 对应数据库中的varchar(255)
    allowNull: false
  },
  password: {
    type: sequelize.STRING, // 对应数据库中的varchar(255)
    allowNull: false
  },
  nickName: {
    type: sequelize.STRING, // 对应数据库中的varchar(255)
    comment: "昵称" //注释
  }
  // 自动创建createAt和updateAt
});

// 创建blog模型

const Blog = seq.define("blog", {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  content: {
    type: sequelize.TEXT,
    allowNull: false
  },
  userid: {
    type: sequelize.INTEGER,
    allowNull: false
  }
});
// 关联外键 关系：多对一的关系 多个博客属于一个user

Blog.belongsTo(User, {
  // 表示blog表属于user表，将blog表的userid关联到user表的id，不指定则默认关联id
  foreignKey: "userid"
});
User.hasMany(Blog, {
  // 表示blog表属于user表，将blog表的userid关联到user表的id，不指定则默认关联id
  foreignKey: "userid"
});
// mysql创建外键的方式
// 1.修改表：ALTER TABLE 表名 ADD FOREIGN KEY [外键名字] (外键字段) REFERENCES 父表 (主键字段);

// 2.创建表的时候创建外键
//  FOREIGN KEY (vend_id) REFERENCES Vendors (vend_id)
module.exports = {
  User,
  Blog
};
