const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spaceracersdb');

app.use(require('./routes/api'));
app.use(serve(__dirname + '/client/dist'));

const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('add-message', message => {
        io.emit('message', {
            type: 'new-message',
            text: message
        });
    });
});

server.listen(3000, () => {
    console.log('Listening on port 3000...');
});
