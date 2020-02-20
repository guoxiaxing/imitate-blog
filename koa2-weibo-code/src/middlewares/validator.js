/**
 * @description json schema 中间件
 * @author guoxiaxing
 */

const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorMessage');

/**
 * 获取校验函数
 * @param {function} validateFn 校验函数
 */
function getValidator(validateFn) {
  return async function(ctx, next) {
    const error = validateFn(ctx.request.body);
    if (error) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }
    await next();
  };
}
module.exports = {
  getValidator
};
