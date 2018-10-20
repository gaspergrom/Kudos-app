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
    offeredTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employee'
        }
    ],
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    kudosReward: Number,
    comment: String,
    
    date: Date,
    assignedDate: Date,
    waitingForApprovalDate: Date,
    completedDate: Date
});

module.exports = mongoose.model('kudos-request', kudosRequestSchema);