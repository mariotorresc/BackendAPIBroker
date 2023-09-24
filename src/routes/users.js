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

router.post('users-create', '/register', async (ctx) => {
  await ctx.orm.user
    .create(ctx.request.body.user)
    .then((ctx.status = 201))
    .catch((error) => {
      ctx.status = 400;
      ctx.body = error.message;
    });
});

// Añadir dinero a la billetera //
router.patch('users-load', '/load', async (ctx) => {
  const { id } = ctx.body;
  const { money } = ctx.request.body;
  const User = await ctx.orm.user.findByPk(id);
  if (!User) {
    ctx.status = 404;
    ctx.body = { message: 'User not found' };
    return;
  }
  try {
    await User.update({ money });
    ctx.status = 200;
    ctx.body = { message: 'El dinero se ha cargado a su billetera' };
  } catch (error) {
    ctx.status = 400;
    ctx.body = error.message;
  }
});

module.exports = router;
