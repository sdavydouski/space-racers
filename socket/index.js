module.exports = server => {
    const io = require('socket.io').listen(server);

    io.on('connect', socket => {
        console.log('Client connected ' + socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected ' + socket.id);
        })
    });

};