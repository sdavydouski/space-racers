const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});
const serve = require('koa-static');

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

app.use(router.routes());
app.use(serve(__dirname + '/client/dist'));

app.listen(3000);
