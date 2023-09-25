const KoaRouter = require('koa-router');

const hello = require('./routes/stocks');
const index = require('./routes/index');
const users = require('./routes/users');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/stocks', hello.routes());
router.use('/users', users.routes());

module.exports = router;
