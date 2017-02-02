const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});

router
    .use('/tracks', require('./tracks'))
    .use('/racers', require('./racers'));

module.exports = router.routes();
