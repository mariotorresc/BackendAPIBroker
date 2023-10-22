const KoaRouter = require('koa-router');
const jwt = require('jsonwebtoken');
// const { loadUser } = require('../helpers/permissions');
// const { authentication } = require('../helpers/authentication');
// const { sequelize } = require('../models');

const router = new KoaRouter();

router.post('login', '/login', async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await ctx.orm.user.findOne({
    include: [
      {
        model: ctx.orm.role,
        require: false,
      },
    ],
    where: { email },
  });
  if (!user) {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication failed',
    };
    return;
  }
  const isPasswordCorrect = user && (await user.checkPassword(password));
  if (isPasswordCorrect) {
    ctx.status = 200;
    ctx.body = {
      token: await jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '7d',
      }),
      user: { ...user.dataValues },
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: 'Authentication failed',
    };
  }
});

router.post('user-register', '/register', async (ctx) => {
  const { email, name, lastname } = ctx.request.body;
  await ctx.orm.user
    .create({
      email,
      lastName: lastname,
      name,
      password: 'N0tTheRe4lP4ssw0rd',
    })
    .then(() => {
      ctx.status = 200;
    })
    .catch((err) => {
      ctx.body = err.message;
      ctx.status = 400;
    });
});

router.get('user-requests', '/requests', async (ctx) => {
  const { email } = ctx.query ?? '';
  const user = await ctx.orm.user.findOne({
    where: { email },
  });
  const requests = await user.getRequests({
    include: {
      model: ctx.orm.company,
      model: ctx.orm.stock,
    },
  });
  ctx.body = requests;
  ctx.status = 200;
});

module.exports = router;
