const KoaRouter = require('koa-router');

const hello = require('./routes/stocks');
const index = require('./routes/index');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/stocks', hello.routes());

module.exports = router;
