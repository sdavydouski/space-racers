const uuid = require('uuid/v1');
const Track = require('../models/track');

module.exports = server => {
    const io = require('socket.io').listen(server);
    const racing = io.of('/racing');

    let races = [];

    //todo: RacesService on the client (for caching, etc.)
    //todo: handle incorrect race ids

    // races = [{
    //     id: 'string',
    //     countdown: 'number',
    //     track: {
    //         _id: 'string',
    //         type: 'string',
    //         text: 'string',
    //         createdAt: 'Date',
    //         updatedAt: 'Date'
    //     },
    //     racers: [{
    //         id: 'string',
    //         distance: 'number',
    //         result: 'number'
    //     }]
    // }];

    racing.on('connect', socket => {
        console.log('Client connected ' + socket.id);

        socket.on('disconnect', () => {
            console.log('Client disconnected ' + socket.id);
        });

        socket.on('get-track-types', async () => {
            const types = await Track.getTypes();
            socket.emit('get-track-types', types);
        });

        socket.on('add-race', async (type, countdown) => {
            let track = await Track.getRandomByType(type);

            let race = {
                id: uuid(),
                countdown: countdown,
                track: track,
                racers: []
            };

            races.unshift(race);

            racing.emit('add-race', race);
        });

        socket.on('remove-race', async (id) => {
            let index = races.findIndex(race => race.id === id);

            if (index > -1) {
                races.splice(index, 1);
                racing.emit('remove-race', id);
            }
        });

        socket.on('join-race', async (raceId, racerId) => {
            let race = races.find(race => race.id === raceId);

            let racer = {
                id: racerId,
                distance: 0,
                result: 0
            };

            race.racers.push(racer);

            socket.join(raceId);

            racing.emit('join-race', {
                raceId: raceId,
                racer: racer
            });
        });

        socket.on('leave-race', async (raceId, racerId) => {
            let race = races.find(race => race.id === raceId);

            let racerIndex = race.racers.findIndex(racer => racer.id === racerId);

            if (racerIndex > -1) {
                race.racers.splice(racerIndex, 1);

                socket.leave(raceId);

                racing.emit('leave-race', {
                    raceId: raceId,
                    racerId: racerId
                });

                if (race.racers.length === 0) {
                    setTimeout(() => {
                        if (race.racers.length === 0) {
                            races.splice(races.indexOf(race), 1);
                            racing.emit('remove-race', race.id);
                        }
                    }, 10000);
                }
            }
        });

        socket.on('racer-move', async (raceId, racer) => {
            racing.in(raceId).emit({
                racerId: racer.id,
                distance: racer.distance
            });
        });

        socket.on('init-races', async () => {
            socket.emit('init-races', races);
        });

        setInterval(() => {
            let updatedRaces = races
                .filter(race => race.countdown > 0)
                .forEach(race => race.countdown--)
                .map(race => ({ id: race.id, countdown: race.countdown }));

            socket.emit('update-races-countdown', updatedRaces);
        }, 1000);
    });

};
