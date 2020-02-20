/**
 * @description json schema 校验
 * @author guoxiaxing
 */

const Ajv = require('ajv');

const ajv = new Ajv({
  // allErrors: true // 输出所有的错误 比较慢
});

/**
 * 校验函数
 * @param {Object} schema 校验规则
 * @param {Object} data 校验数据
 */
function validate(schema, data = {}) {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    return ajv.errors[0];
  }
}

module.exports = validate;
