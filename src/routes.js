const KoaRouter = require('koa-router');

const hello = require('./routes/stocks');
const index = require('./routes/index');
const users = require('./routes/users');
const requests = require('./routes/requests');
const companies = require('./routes/companies');

const router = new KoaRouter();

router.use('/', index.routes());
router.use('/stocks', hello.routes());
router.use('/users', users.routes());
router.use('/requests', requests.routes());
router.use('/companies', companies.routes());

module.exports = router;
