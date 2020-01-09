const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
    isMe: true,
    blogList: [
      {
        id: 1,
        title: "aaa"
      },
      {
        id: 2,
        title: "bbb"
      },
      {
        id: 3,
        title: "ccc"
      }
    ]
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});

router.get("/profile/:username", async (ctx, next) => {
  const { username } = ctx.params;
  ctx.body = {
    username
  };
});

module.exports = router;
