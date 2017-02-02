const Router = require('koa-router');
const router = new Router();

const Track = require('../../models/track');

router
    .get('/', async (ctx) => {
        ctx.body = await Track.find();
    })
    .get('/random', async (ctx) => {
        let count = await Track.count({});
        let random = Math.floor(Math.random() * count);

        ctx.body = await Track.findOne().skip(random);
    });

module.exports = router.routes();
