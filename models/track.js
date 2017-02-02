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

const Track = mongoose.model('Track', trackSchema);

module.exports = Track;
