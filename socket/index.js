const Track = require('../models/track');

module.exports = server => {
    const io = require('socket.io').listen(server);

    let races = [];

    const racing = io.of('/racing');

    racing.on('connect', socket => {
        console.log('Client connected ' + socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected ' + socket.id);
        });

        socket.on('get-race-types', async () => {
            const raceTypes = await Track.find().distinct('type');
            socket.emit('get-race-types', raceTypes);
        });

        socket.on('add-race', async (race) => {
            console.info('add-race');
            console.log(races);

            race.racers = [];
            races.unshift(race);
            racing.emit('add-race', race);
        });

        socket.on('remove-race', async (race) => {
            console.info('remove-race');
            console.log(races);
            // todo: handle -1 index
            races.splice(races.indexOf(race), 1);
            racing.emit('remove-race', race);
        });

        socket.on('join-race', async (raceId, racer) => {
            console.info('join-race');
            console.log(races);

            let race = races.find(race => race.id === raceId);
            race.racers.push(racer);
            socket.join(raceId);
            racing.emit('join-race', {
                raceId: raceId,
                racer: racer
            });
        });

        socket.on('leave-race', async (raceId, racer) => {
            console.info('leave-race');
            console.log(races);

            let race = races.find(race => race.id === raceId);
            race.racers.splice(race.racers.indexOf(raceId), 1);

            socket.leave(raceId);

            racing.emit('leave-race', {
                raceId: raceId,
                racer: racer
            });

            // remove the race when the last racer leaves
            // todo: remove the race after some timeout
            // if (race.racers.length === 0) {
            //     races.splice(races.indexOf(race), 1);
            //     racing.emit('remove-race', race);
            // }
        });

        socket.on('get-race-info', async (raceId) => {
            console.info('get-race-info');
            console.log(races);

            let race = races.find(race => race.id === raceId);
            //todo: track is a big object, handle it with caress
            if (!race.track) {
                race.track = await Track.findRandomByType(race.type);
            }

            socket.emit('get-race-info', race);
        });

        socket.on('init-races', async () => {
            socket.emit('init-races', races);
        });
    });

};
