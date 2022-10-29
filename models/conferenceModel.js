const mongoose = require('mongoose');
const schema = mongoose.Schema;

const conferenceSchema = new schema({
    conferenceName: {
        type: String
    },
    conferenceDescription: {
        type: String
    },
    conferenceVenue: {
        type: String
    },
    keynoteSpeaker: {
        type: Array,
        name: {
            type: String
        },
        designation: {
            type: String
        }
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    tracks: {
        type: Array,
        name: {
            type: String
        },
        description: {
            type: String
        }
    },
    status: {
        type: String
    },
    other: {
        type: String
    }
},{
    timestamps: true
});

module.exports = conference = mongoose.model('conference',conferenceSchema);