const KoaRouter = require('koa-router');
const pkg = require('../../package.json');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  ctx.status = 200;
  ctx.body = "welcome to marios api"
});

module.exports = router;
