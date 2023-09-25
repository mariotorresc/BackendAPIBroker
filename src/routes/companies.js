const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('get-all-companies', '/', async (ctx) => {
  const companies = await ctx.orm.company.findAll();
  ctx.body = companies;
  ctx.status = 200;
});

module.exports = router;
