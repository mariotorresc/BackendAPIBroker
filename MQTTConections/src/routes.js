/* eslint-disable import/no-extraneous-dependencies */
const KoaRouter = require("koa-router");

const sender = require("./routes/mqttSender");

const router = new KoaRouter();

router.use("/", sender.routes());

module.exports = router;
