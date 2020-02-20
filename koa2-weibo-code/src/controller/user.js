/**
 * @description user controller
 * @author guoxiaxing
 */

const { getUserInfo, createUser } = require('../services/user');

const { SuccessModel, ErrorModel } = require('../model/ResModel');

const doCrypto = require('../util/cryp');

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorMessage');
/**
 * 用户名是否存在
 * @param {string} userName  用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new SuccessModel(userInfo);
  } else {
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 注册
 * @param {string} userName 用户名
 * @param {string}  password 密码
 * @param {number} gender 性别
 */
async function register({ userName, password, gender }) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }
  try {
    createUser({
      userName,
      password: doCrypto(password),
      gender
    });
    return new SuccessModel();
  } catch (e) {
    console.error(e.message);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登陆
 * @param {Object}  ctx
 * @param {string}  userName 用户名
 * @param {string}  userName 密码
 */
async function login(ctx, userName, password) {
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    return new ErrorModel(loginFailInfo);
  }
  if (!ctx.session.userInfo) {
    ctx.session.userInfo = userInfo;
  }
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login
};
