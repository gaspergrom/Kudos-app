const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    slackId: String,
    name: String,
    realName: String,
    imgPaths: {
        image_24: String,
        image_32: String,
        image_48: String,
        image_72: String,
        image_192: String,
        image_512: String,
        image_1024: String
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    departments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'department'
        }
    ],
    roles: [String],
    availableKudos: Number,
    kudosToGive: Number,
    receivedKudos: Number
});

module.exports = mongoose.model('employee', employeeSchema);