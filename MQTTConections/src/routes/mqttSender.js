/* eslint-disable import/no-extraneous-dependencies */
const KoaRouter = require("koa-router");
const {
  PublishNewRequest,
  PublishValidation,
  PublishNewOffer,
  PublishRejection,
  PublishNewProposal,
  PublishAcceptance,
} = require("..//mqtts/mqttSender");

const router = new KoaRouter();

router.get("/", async (ctx) => {
  console.log("MQTT Sender");
  ctx.status = 200;
  ctx.body = "MQTT Sender";
});

router.post("/newRequest", async (ctx) => {
  console.log("newRequest");
  const { stockRequest } = ctx.request.body;
  await PublishNewRequest(stockRequest);
  ctx.status = 200;
  ctx.body = "Request sent";
});

router.post("/validation", async (ctx) => {
  const { stockRequest } = ctx.request.body;
  await PublishValidation(stockRequest);
  ctx.status = 200;
  ctx.body = "Validation sent";
});

router.post("/offer", async (ctx) => {
  const { auctionData } = ctx.request.body;
  await PublishNewOffer(auctionData);
  ctx.status = 200;
  ctx.body = "Validation sent";
});

router.post("/proposal", async (ctx) => {
  const { auctionData } = ctx.request.body;
  await PublishNewProposal(auctionData);
  ctx.status = 200;
  ctx.body = "Validation sent";
});

router.post("/acceptance", async (ctx) => {
  const { auctionData } = ctx.request.body;
  await PublishAcceptance(auctionData);
  ctx.status = 200;
  ctx.body = "Validation sent";
});

router.post("/rejection", async (ctx) => {
  const { auctionData } = ctx.request.body;
  await PublishRejection(auctionData);
  ctx.status = 200;
  ctx.body = "Validation sent";
});

module.exports = router;
