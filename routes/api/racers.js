const Router = require('koa-router');
const router = new Router();

const Racer = require('../../models/racer');

router
    .get('/', async (ctx) => {
        ctx.body = await Racer.find();
    });

module.exports = router.routes();
