/**
 * @description utils controller
 * @author guoxiaxing
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel');

const { uploadFileSizeFailInfo } = require('../model/ErrorMessage');

const fsExtra = require('fs-extra');

const path = require('path');

// 文件目录
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles');
// 上传文件最大大小
const MAX_SIZE = 1024 * 10124 * 1024;

// 是否需要创建目录

fsExtra.pathExists(DIST_FOLDER_PATH).then(exist => {
  if (!exist) {
    fsExtra.ensureDir(DIST_FOLDER_PATH);
  }
});
/**
 * 保存文件
 * @param {Object} obj 文件信息
 */
async function saveFile({ size, filePath, name, type }) {
  if (size > MAX_SIZE) {
    await fsExtra.remove(filePath);
    return new ErrorModel(uploadFileSizeFailInfo);
  }
  // 移动文件
  const fileName = `${Date.now()}_${name}`;
  const distFilePath = path.join(DIST_FOLDER_PATH, fileName);
  await fsExtra.move(filePath, distFilePath);
  return new SuccessModel({
    url: '/' + fileName
  });
}

module.exports = {
  saveFile
};
