/**
 * @description 测试 http 请求
 * @author guoxiaxing
 */
const request = require("supertest");
const server = require("../src/app").callback();

module.exports = request(server);
