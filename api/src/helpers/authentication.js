const { decrypt } = require('./encryptation');
require('dotenv').config();

async function authentication(ctx, next) {
  const string = process.env.SECRET_TOKEN;
  const decryptedString = decrypt(string);
  const tokens = JSON.parse(decryptedString);
  const requestToken = ctx.request.headers?.authorization?.split(' ')[1];
  const [service, password] = requestToken ? requestToken.split('.') : ['', 'invalid'];
  if (tokens[service] && tokens[service] === password) {
    return next();
  }
  ctx.response.status = 401;
  return null;
}

module.exports = {
  authentication,
};
