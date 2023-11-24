const jwt = require('jsonwebtoken');
require('dotenv').config();

async function loadUser(ctx, next) {
  if (ctx.request.header.authorization) {
    const token = ctx.request.header.authorization.split(' ');
    try {
      const decoded = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
      if (decoded) {
        const user = await ctx.orm.user.findByPk(decoded.userId);
        if (user) {
          ctx.state.user = user;
          return next();
        }
      }
    } catch (error) {
      ctx.response.status = 401;
      return null;
    }
  }
  ctx.response.status = 401;
  return null;
}

async function isAdmin(ctx, next) {
  const { user } = ctx.state;
  const admin = await user.getRoles({ where: { roleName: 'ADMIN' } });
  if (user && admin) {
    return next();
  }
  ctx.response.status = 401;
  return null;
}

module.exports = {
  isAdmin,
  loadUser,
};
