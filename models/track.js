const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
