const uuid = require('uuid/v4');
const Track = require('../models/track');

module.exports =  {
    //todo: add flowtype support
    namespace: null,
    socket: null,

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
    races: {},

    init(namespace) {
        this.namespace = namespace;

        namespace.on('connect', socket => {
            console.log('Client connected ' + socket.id);

            this.socket = socket;

            Object.keys(this.eventHandlers).forEach(event => {
                socket.on(event, this.eventHandlers[event].bind(this));
            });
        });
    },

    eventHandlers: {
        'get-track-types': async function () {
            const types = await Track.getTypes();
            this.socket.emit('get-track-types', types);
        },

        'add-race': async function (type, countdown) {
            console.log('add-race');

            let track = await Track.getRandomByType(type);

            let raceId = uuid();
            this.races[raceId] = {
                countdown: countdown,
                track: track,
                racers: {}
            };

            this.namespace.emit('add-race', {
                id: raceId,
                ...this.races[raceId]
            });
        },

        'remove-race': async function (id) {
            console.log('remove-race');

            delete this.races[id];
            this.namespace.emit('remove-race', id);
        },

        'join-race': async function (raceId, racerId) {
            console.log('join-race');

            this.races[raceId].racers[racerId] = {
                distance: 0,
                result: 0
            };

            this.socket.join(raceId);

            this.namespace.emit('join-race', {
                raceId: raceId,
                racer: {
                    id: racerId,
                    ...this.races[raceId].racers[racerId]
                }
            });
        },

        'leave-race': async function (raceId, racerId) {
            console.log('leave-race');

            delete this.races[raceId].racers[racerId];

            this.socket.leave(raceId);

            this.namespace.emit('leave-race', {
                raceId: raceId,
                racerId: racerId
            });
        },

        'racer-move': async function (raceId, racer) {
            console.log('racer-move');

            this.races[raceId].racers[racer.id].distance = racer.distance;
            this.namespace.in(raceId).emit('racer-move', racer);
        },

        'race-finished': async function (raceId, racerId) {
            console.log('race-finished');

            let racers = this.races[raceId].racers;
            let currentRacer = racers[racerId];

            Object.keys(racers).forEach(id => {
                if (racers[id].result > currentRacer.result) {
                    currentRacer.result = racers[id].result;
                }
            });

            currentRacer.result++;

            this.namespace.in(raceId).emit('race-finished', {
                id: racerId,
                ...currentRacer
            });
        },

        'get-races': async function () {
            this.socket.emit('get-races', this.races);
        },

        //todo: do i really need this stuff?
        'get-race': async function (id) {
            console.log('get-race');

            this.socket.emit('get-race', {
                id: id,
                ...this.races[id]
            });
        },

        'disconnect': async function () {
            console.log('Client disconnected ' + this.socket.id);
        }
    }
};
