const path = require('path');
require('dotenv').config();
const Koa = require('koa');
const koaLogger = require('koa-logger');
const koaFlashMessage = require('koa-flash-message').default;
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('koa-cors');
const override = require('koa-override-method');
const routes = require('./routes');
const orm = require('./models');

// App constructor
const app = new Koa();

// Enable CORS

// localhost
app.use(cors());
// app.use(cors({ origin: 'http://APIMariosBroker.me' }));

const developmentMode = app.env === 'development';
const testMode = app.env === 'test';

app.keys = [
  'these secret keys are used to sign HTTP cookies',
  'to make sure only this app can generate a valid one',
  'and thus preventing someone just writing a cookie',
  "saying he is logged in when it's really not",
];

// expose ORM through context's prototype
app.context.orm = orm;

/**
 * Middlewares
 */

// expose running mode in ctx.state
app.use((ctx, next) => {
  ctx.state.env = ctx.app.env;
  return next();
});

// log requests
if (!testMode) {
  app.use(koaLogger());
}

// webpack middleware for dev mode only
if (developmentMode) {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const koaWebpack = require('koa-webpack');
  koaWebpack()
    .then((middleware) => app.use(middleware))
    .catch(console.error); // eslint-disable-line no-console
}

app.use(koaStatic(path.join(__dirname, '..', 'build'), {}));

// expose a session hash to store information across requests from the same client
app.use(
  session(
    {
      maxAge: 14 * 24 * 60 * 60 * 1000, // 2 weeks
    },
    app
  )
);

// flash messages support
app.use(koaFlashMessage);

// parse request body
app.use(
  bodyParser({
    formLimit: '2000mb',
    jsonLimit: '2000mb',
    textLimit: '2000mb',
  })
);

app.use((ctx, next) => {
  ctx.request.method = override.call(ctx, ctx.request.body.fields || ctx.request.body);
  return next();
});

// Routing middleware
app.use(routes.routes());

module.exports = app;
