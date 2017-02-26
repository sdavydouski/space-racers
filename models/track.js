const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Racer'
    }
}, {
    timestamps: true
});

trackSchema.statics.findRandom = async () => {
    let count = await Track.count({});
    let random = Math.floor(Math.random() * count);

    return await Track.findOne().skip(random);
};

trackSchema.statics.findRandomByType = async (type) => {
    let count = await Track.count({ type: type });
    let random = Math.floor(Math.random() * count);

    return await Track.findOne({ type: type }).skip(random);
};

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
