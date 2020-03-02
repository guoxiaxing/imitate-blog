/**
 * @description @ 用户关系 service
 * @author guoxiaxing
 */

const { AtRelation } = require('../db/model/index');

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

module.exports = {
  createAtRelation
};
