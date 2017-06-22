const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const send = require('koa-send');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/spaceracersdb');

app.use(require('./routes/api'));
app.use(serve(__dirname + '/client/dist'));
app.use(async (ctx) => {
    await send(ctx, 'index.html', {root: __dirname + '/client/dist/'});
});

const server = require('http').createServer(app.callback());

server.listen(3000, () => {
    console.log('Listening on port 3000...');
});
