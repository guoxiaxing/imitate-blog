/**
 * @description res 数据模型
 * @author guoxiaxing
 */

/**
 * 基础模块
 */
class BaseModel {
  constructor({ errorno, data, msg }) {
    this.errorno = errorno;
    if (data) {
      this.data = data;
    }
    if (msg) {
      this.msg = msg;
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errorno: 0,
      data
    });
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ errorno, msg }) {
    super({
      errorno,
      msg
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};
