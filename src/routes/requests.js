const KoaRouter = require('koa-router');

const router = new KoaRouter();

// Conseguir request por user id //

router.get('user-requests', '/requests', async (ctx) => {
  const { user_id: userId } = ctx.request.body;
  const user = await ctx.orm.user.findByPk(userId);
  const requests = await user.getRequests();
  ctx.body = requests;
  ctx.status = 200;
});

module.exports = router;
