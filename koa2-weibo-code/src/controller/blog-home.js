/**
 * @description 微博首页 controller
 * @author guoxiaxing
 */

const { createBlog, getFollowersBlogList } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorMessage');
const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/const');
const { getUserInfo } = require('../services/user');
const { createAtRelation } = require('../services/at-relation');
/**
 * 创建微博
 * @param {Object} param0 {content,image,userId}
 */
async function create({ content, image, userId }) {
  const atUserNameList = [];
  content = content.replace(REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    atUserNameList.push(userName);
    return matchStr;
  });

  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  );

  const atUserIdList = atUserList.map(userInfo => userInfo.id);
  try {
    // 创建微博
    const blog = await createBlog({ userId, content, image });
    await Promise.all(
      atUserIdList.map(userId => createAtRelation(blog.id, userId))
    );
    return new SuccessModel(blog);
  } catch (e) {
    console.error(e.message);
    return new ErrorModel(createBlogFailInfo);
  }
}

/**
 * 获取微博数据
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  const result = await getFollowersBlogList({
    userId,
    pageIndex,
    pageSize: PAGE_SIZE
  });
  const blogList = result.blogList;

  // 拼接返回数据
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  });
}

module.exports = {
  create,
  getHomeBlogList
};
