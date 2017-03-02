const uuid = require('uuid/v1');
const Track = require('../models/track');

module.exports = server => {
    const io = require('socket.io').listen(server);
    const racing = io.of('/racing');

    let races = [];

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

        socket.on('racer-move', async (raceId, updatedRacer) => {
            let race = races.find(race => race.id === raceId);
            let racer = race.racers.find(racer => racer.id === updatedRacer.id);
            racer.distance = updatedRacer.distance;

            racing.in(raceId).emit('racer-move', {
                racerId: racer.id,
                distance: racer.distance
            });
        });

        socket.on('get-races', async () => {
            socket.emit('get-races', races);
        });


        //todo: do i really need this stuff?
        socket.on('get-race', async (id) => {
            let race = races.find(race => race.id === id);
            socket.emit('get-race', race);
        });

        // setInterval(() => {
        //     let updatedRaces = races
        //         .filter(race => race.countdown > 0)
        //         .map(race => {
        //             race.countdown--;
        //             return {
        //                 id: race.id,
        //                 countdown: race.countdown
        //             };
        //         });
        //
        //     socket.emit('update-races-countdown', updatedRaces);
        // }, 1000);
    });

};
