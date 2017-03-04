const uuid = require('uuid/v4');
const Track = require('../models/track');

module.exports = server => {
    const io = require('socket.io').listen(server);
    const racing = io.of('/racing');

    let races = {};

    //todo: handle incorrect race ids

    // races = {
    //     id: {
    //         countdown: 'number',
    //         track: {
    //             _id: 'string',
    //             type: 'string',
    //             text: 'string',
    //             createdAt: 'Date',
    //             updatedAt: 'Date'
    //         },
    //         racers: {
    //             id: {
    //                 distance: 'number',
    //                 result: 'number'
    //             }
    //         }
    //     }
    // }

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
            console.log('add-race');
            let track = await Track.getRandomByType(type);

            let raceId = uuid();
            races[raceId] = {
                countdown: countdown,
                track: track,
                racers: {}
            };

            racing.emit('add-race', {
                id: raceId,
                ...races[raceId]
            });
        });

        socket.on('remove-race', async (id) => {
            console.log('remove-race');
            delete races[id];
            racing.emit('remove-race', id);
        });

        socket.on('join-race', async (raceId, racerId) => {
            console.log('join-race');
            races[raceId].racers[racerId] = {
                distance: 0,
                result: 0
            };

            socket.join(raceId);

            racing.emit('join-race', {
                raceId: raceId,
                racer: {
                    id: racerId,
                    ...races[raceId].racers[racerId]
                }
            });
        });

        socket.on('leave-race', async (raceId, racerId) => {
            console.log('leave-race');
            delete races[raceId].racers[racerId];

            socket.leave(raceId);

            racing.emit('leave-race', {
                raceId: raceId,
                racerId: racerId
            });

            //todo: duplicate condition
            //todo: buggy
            // if (Object.keys(races[raceId].racers).length === 0) {
            //     setTimeout(() => {
            //         if (Object.keys(races[raceId].racers).length === 0) {
            //             delete races[raceId];
            //             racing.emit('remove-race', raceId);
            //         }
            //     }, 10000);
            // }
        });

        socket.on('racer-move', async (raceId, racer) => {
            console.log('racer-move');
            races[raceId].racers[racer.id].distance = racer.distance;
            racing.in(raceId).emit('racer-move', racer);
        });

        socket.on('get-races', async () => {
            socket.emit('get-races', races);
        });

        //todo: do i really need this stuff?
        socket.on('get-race', async (id) => {
            console.log(races[id]);
            socket.emit('get-race', {
                id: id,
                ...races[id]
            });
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
