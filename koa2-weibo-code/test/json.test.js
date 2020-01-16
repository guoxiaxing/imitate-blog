/**
 * @description json test
 * @author guoxiaxing
 */

const server = require("./server");

test("json result", async () => {
  const jsonRes = await server.get("/json");
  expect(jsonRes.body).toEqual({
    title: "koa2 json"
  });
  expect(jsonRes.body.title).toBe("koa2 json");
});
