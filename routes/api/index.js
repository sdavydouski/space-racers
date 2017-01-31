const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});

const Track = require('../../models/track');
const Racer = require('../../models/racer');

router
    .get('/', async (ctx) => {
        ctx.body = 'Index Page';

        let track = new Track({
            type: 'Circuit',
            text: `Test text for a race.`
        });

        await track.save();

        let tracks = await Track.find();
        console.log(tracks);

        let racer = new Racer({
            name: 'schumacher',
            password: 'F1',
            races: [
                {
                    createdAt: new Date,
                    avgSpeed: 350,
                    maxSpeed: 456,
                    duration: 125,
                    numberOfErrors: 3,
                    actualText: 'Some test actual text.',
                    trackId: tracks[0].id
                }
            ]
        });

        await racer.save();

        let racers = await Racer.find();
        console.log(racers);
    })
    .get('/test', async (ctx) => {
        ctx.body = 'Test Page';
    })
    .get('/about', async (ctx) => {
        ctx.body = 'About Page';
    });

module.exports = router.routes();
