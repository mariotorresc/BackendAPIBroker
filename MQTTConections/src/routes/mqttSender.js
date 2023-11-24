/* eslint-disable import/no-extraneous-dependencies */
const KoaRouter = require("koa-router");
const {
  PublishNewRequest,
  PublishValidation,
} = require("..//mqtts/mqttSender");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  ctx.status = 200;
  ctx.body = "MQTT Sender";
});

router.post("/newRequest", async (ctx) => {
  const { stockRequest } = ctx.request.body;
  await PublishNewRequest(stockRequest)
    .then(() => {
      ctx.status = 200;
      ctx.body = "Request sent";
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = err.message;
    });
});

router.post("/validation", async (ctx) => {
  const { stockRequest } = ctx.request.body;
  await PublishValidation(stockRequest)
    .then(() => {
      ctx.status = 200;
      ctx.body = "Validation sent";
    })
    .catch((err) => {
      ctx.status = 400;
      ctx.body = err.message;
    });
});

module.exports = router;
