const KoaRouter = require('koa-router');

const hello = require('./routes/stocks');
const index = require('./routes/index');
const users = require('./routes/users');
const companies = require('./routes/companies');
const requests = require('./routes/requests');
const stocks = require('./routes/stocks');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/stocks', hello.routes());
router.use('/users', users.routes());
router.use('/companies', companies.routes());
router.use('/requests', requests.routes());
router.use('/stocks', stocks.routes());

module.exports = router;
