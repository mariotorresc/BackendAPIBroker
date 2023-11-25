const KoaRouter = require('koa-router');
const axios = require('axios');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  await axios
    .get('http://mqttsender:3010/sender')
    .then((res) => {
      ctx.body = res.data;
      ctx.status = 200;
    })
    .catch((err) => console.log(err.message));
});

module.exports = router;
