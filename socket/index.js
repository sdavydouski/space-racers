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
            //races.delete(race.id);
            socket.broadcast.emit('add-race', race);
        });
        socket.on('init-races', async () => {
            console.log(races);
            socket.emit('init-races', races);
        });
    });

};
