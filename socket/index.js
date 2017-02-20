const Track = require('../models/track');

module.exports = server => {
    const io = require('socket.io').listen(server);

    io.on('connect', socket => {
        console.log('Client connected ' + socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected ' + socket.id);
        });

        socket.on('get-race-types', async () => {
            const raceTypes = await Track.find().distinct('type');
            socket.emit('get-race-types', raceTypes);
        });
    });

};