const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});

router
    .get('/', async (ctx) => {
        ctx.body = 'Index Page';
    })
    .get('/test', async (ctx) => {
        ctx.body = 'Test Page';
    })
    .get('/about', async (ctx) => {
        ctx.body = 'About Page';
    });

module.exports = router.routes();
