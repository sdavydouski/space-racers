const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spaceracersdb');

app.use(require('./routes/api'));
app.use(serve(__dirname + '/client/dist'));

app.listen(3000);
