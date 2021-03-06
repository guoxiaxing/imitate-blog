/**
 * @description @ 用户关系 service
 * @author guoxiaxing
 */

const { AtRelation, Blog, User } = require('../db/model/index');
const { formatBlog, formatUser } = require('./_format');

/**
 * 创建@ 关系
 * @param {number} blogId
 * @param {number} userId
 */
async function createAtRelation(blogId, userId) {
  const result = AtRelation.create({
    blogId,
    userId
  });
  return result.dataValues;
}

/**
 * 获取at数量 未读的
 * @param {number} userId
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  });
  return result.count;
}

/**
 * 获取at数量 未读的
 * @param {Object} Obj 查询条件
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize = 10 }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offset: pageSize * pageIndex,
    order: [['id', 'desc']],
    include: [
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      { model: User, attributes: ['nickName', 'userName', 'picture'] }
    ]
  });
  // 格式化
  let blogList = result.rows.map(blog => blog.dataValues);
  blogList = formatBlog(blogList);
  blogList = blogList.map(item => {
    item.user = formatUser(item.user.dataValues);
    return item;
  });
  return {
    count: result.count,
    blogList
  };
}

/**
 * 标记为已读
 * @param {Object} param0 要更新的内容
 * @param {Object} param1 更新的条件
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
  const updateData = {};
  if (newIsRead) {
    updateData.isRead = newIsRead;
  }
  const whereData = {};
  if (userId) {
    whereData.userId = userId;
  }
  if (isRead) {
    whereData.isRead = isRead;
  }
  const result = AtRelation.update(updateData, {
    where: whereData
  });
  return result[0] > 0;
}

module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
};
