const
    mongoose = require('mongoose'),
    KudosRequestState = require('../other/kudos-request-state');

const kudosRequestSchema = new mongoose.Schema({
    state: {
        type: KudosRequestState,
        ref: 'kudos-request-state'
    },
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    offeredToDepartments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'department'
        }
    ],
    offeredToEmployees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employee'
        }
    ],
    assignedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employee'
        }
    ],
    amount: Number,
    title: String,
    comment: String,
    date: Date
});

module.exports = mongoose.model('kudos-request', kudosRequestSchema);