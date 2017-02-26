const mongoose = require('mongoose');

const racerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    spaceship: Buffer,
    races: [
        {
            _id: false,
            createdAt: {
                type: Date,
                required: true
            },
            avgSpeed: {
                type: Number,
                required: true
            },
            maxSpeed: {
                type: Number,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            numberOfErrors: {
                type: Number,
                required: true
            },
            actualText: {
                type: String,
                required: true
            },
            trackId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Track',
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Racer = mongoose.model('Racer', racerSchema);

module.exports = Racer;
