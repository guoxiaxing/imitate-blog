/**
 * @description utils API 路由
 * @author guoxiaxing
 */
const router = require('koa-router')();
const { saveFile } = require('../../controller/utils');
const { loginCheck } = require('../../middlewares/loginCheck');
const koaForm = require('formidable-upload-koa');

router.prefix('/api/utils');

// 注册路由

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
  const file = ctx.req.files['file'];
  if (!file) {
    return;
  }
  const { size, type, path, name } = file;
  ctx.body = await saveFile({ size, type, filePath: path, name });
});

module.exports = router;
