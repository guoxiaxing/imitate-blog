/**
 * @description 微博首页 controller
 * @author guoxiaxing
 */

const { createBlog, getFollowersBlogList } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorMessage');
const { PAGE_SIZE } = require('../conf/const');
/**
 * 创建微博
 * @param {Object} param0 {content,image,userId}
 */
async function create({ content, image, userId }) {
  try {
    // 创建微博
    const blog = await createBlog({ userId, content, image });
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
