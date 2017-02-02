const Router = require('koa-router');
const router = new Router({
    prefix: '/api'
});

const Track = require('../../models/track');
const Racer = require('../../models/racer');

router
    .get('/racers', async (ctx) => {
        // let track = new Track({
        //     type: 'Circuit',
        //     text: `Test text for a race.`
        // });
        //
        // await track.save();
        //
        // let tracks = await Track.find();
        // console.log(tracks);
        //
        // let racer = new Racer({
        //     name: 'schumacher',
        //     password: 'F1',
        //     races: []
        // });
        //
        // await racer.save();

        ctx.body = await Racer.find();
    })
    .get('/tracks', async (ctx) => {
        ctx.body = await Track.find();
    });

module.exports = router.routes();
