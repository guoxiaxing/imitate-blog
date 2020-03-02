/**
 * @description blog service
 * @author guoxiaxing
 */

const { Blog, User, UserRelation } = require('../db/model/index');
const { formatUser, formatBlog } = require('./_format');

/**
 * 创建微博
 * @param {Object} param0 { userId, content, image }
 */
async function createBlog({ userId, content, image }) {
  const result = await Blog.create({
    userId,
    content,
    image
  });

  return result.dataValues;
}

/**
 * 获取微博数据
 * @param {Object} param0 { userName, pageIndex = 0, pageSize = 10 }
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const whereOpt = {};
  if (userName) {
    whereOpt.userName = userName;
  }
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: whereOpt
      }
    ]
    //result.count属性返回所有数据的总条数，不考虑分页,result.rows表示这个分页中的数据
  });
  let blogList = result.rows.map(data => data.dataValues);
  blogList = blogList.map(item => {
    const user = item.user.dataValues;
    item.user = formatUser(user);
    item.contentFormat = item.content;
    return item;
  });

  return {
    count: result.count,
    blogList: formatBlog(blogList)
  };
}

/**
 * 获取微博数据
 * @param {Object} param0 { userName, pageIndex = 0, pageSize = 10 }
 */
async function getFollowersBlogList({ userId, pageIndex = 0, pageSize = 10 }) {
  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageIndex * pageSize,
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      },
      {
        model: UserRelation,
        attributes: ['userId', 'followerId'],
        where: { userId }
      }
    ]
    //result.count属性返回所有数据的总条数，不考虑分页,result.rows表示这个分页中的数据
  });
  let blogList = result.rows.map(data => data.dataValues);
  blogList = blogList.map(item => {
    const user = item.user.dataValues;
    item.user = formatUser(user);
    item.contentFormat = item.content;
    return item;
  });

  return {
    count: result.count,
    blogList: formatBlog(blogList)
  };
}

module.exports = {
  createBlog,
  getBlogListByUser,
  getFollowersBlogList
};
