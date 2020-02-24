/**
 * @description user controller
 * @author guoxiaxing
 */

const {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
} = require('../services/user');

const { SuccessModel, ErrorModel } = require('../model/ResModel');

const doCrypto = require('../util/cryp');

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  deleteUserFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo
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

/**
 * 删除当前用户
 * @param {string}  userName 用户名
 */
async function del(userName) {
  const result = await deleteUser(userName);
  if (!result) {
    return new ErrorModel(deleteUserFailInfo);
  }
  return new SuccessModel();
}

/**
 * 修改用户信息
 * @param {Object} ctx 为了修改session
 * @param {string} nickName 昵称
 * @param {string}  city 城市
 * @param {number} picture 图片
 */
async function changeInfo(ctx, { nickName, city, picture }) {
  const { userName } = ctx.session.userInfo;
  if (!nickName) {
    nickName = userName;
  }
  const result = await updateUser(
    { newNickName: nickName, newCity: city, newPicture: picture },
    { userName }
  );
  if (result) {
    Object.assign(ctx.session.userInfo, {
      nickName,
      city,
      picture
    });
    return new SuccessModel();
  }
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改密码
 * @param {Object} ctx 为了修改session
 * @param {string} nickName 昵称
 * @param {string}  city 城市
 * @param {number} picture 图片
 */
async function changePassword(ctx, password, newPassword) {
  const { userName } = ctx.session.userInfo;
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    { userName, password: doCrypto(password) }
  );
  if (result) {
    return new SuccessModel();
  }
  return new ErrorModel(changePasswordFailInfo);
}

/**
 * 退出登陆 只需要删除session即可
 * @param {Object} ctx 为了修改session
 */
async function logout(ctx) {
  delete ctx.session.userInfo;
  return new SuccessModel();
}

module.exports = {
  isExist,
  register,
  login,
  del,
  changeInfo,
  changePassword,
  logout
};
