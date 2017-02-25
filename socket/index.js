const Track = require('../models/track');

module.exports = server => {
    const io = require('socket.io').listen(server);

    let races = [];

    io.on('connect', socket => {
        console.log('Client connected ' + socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected ' + socket.id);
        });

        socket.on('get-race-types', async () => {
            const raceTypes = await Track.find().distinct('type');
            socket.emit('get-race-types', raceTypes);
        });

        socket.on('add-race', async (race) => {
            races.push(race);
            socket.broadcast.emit('add-race', race);
        });
        socket.on('remove-race', async (race) => {
            // todo: handle -1 index
            races.splice(races.indexOf(race), 1);
            socket.broadcast.emit('add-race', race);
        });
        socket.on('init-races', async () => {
            socket.emit('init-races', races);
        });
    });

};
