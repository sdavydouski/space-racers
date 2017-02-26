const Router = require('koa-router');
const router = new Router();

const Track = require('../../models/track');

router
    .get('/', async (ctx) => {
        ctx.body = await Track.find();
    })
    .get('/random', async (ctx) => {
        ctx.body = await Track.findRandom();
    });

module.exports = router.routes();
