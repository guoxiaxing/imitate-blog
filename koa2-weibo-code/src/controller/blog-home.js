/**
 * @description 微博首页 controller
 * @author guoxiaxing
 */

const { createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/ErrorMessage');
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

module.exports = {
  create
};
