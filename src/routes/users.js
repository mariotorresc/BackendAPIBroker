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
  try {
    const user = await ctx.orm.user.create({
      email,
      lastName: lastname,
      money: 0,
      name,
      password: '',
    });
    ctx.status = 200;
  } catch (err) {
    ctx.body = err.message;
    ctx.status = 400;
  }
});

// For Test Only
router.get('user-requests', '/requests', async (ctx) => {
  const { user_id: userId } = ctx.request.body;
  const user = await ctx.orm.user.findByPk(userId);
  const requests = await user.getRequests();
  ctx.body = requests;
  ctx.status = 200;
});

// Agregar dinero a usuario //

router.put('add-money', '/add-money', async (ctx) => {
  const { user_id: userId, money } = ctx.request.body;
  const user = await ctx.orm.user.findByPk(userId);
  user.money += money;
  await user.save();
  ctx.body = user;
  ctx.status = 200;
});

// Conseguir acciones del usuario

router.get('user-stocks', '/stocks', async (ctx) => {
  const { user_id: userId } = ctx.request.body;
  const user = await ctx.orm.user.findByPk(userId);
  const stocks = await user.getStocks();
  ctx.body = stocks;
  ctx.status = 200;
});

module.exports = router;
