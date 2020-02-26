/**
 * @description 微博主页路由
 * @author guoxiaxing
 */

const { getBlogListByUser } = require('../services/blog');
const { PAGE_SIZE } = require('../conf/const');
const { SuccessModel } = require('../model/ResModel');
/**
 * 获取微博数据
 * @param {string} userName
 * @param {number} pageIndex
 */
async function getProfileBlogList(userName, pageIndex = 0) {
  const result = await getBlogListByUser({
    userName,
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
  getProfileBlogList
};
