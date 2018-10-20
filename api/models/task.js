const
    DepartmentModel = require('../models/department'),
    EmployeeModel = require('../models/employee'),
    mongoose = require('mongoose'),
    KudosRequestState = require('../other/kudos-request-state');

const kudosRequestSchema = new mongoose.Schema({
    state: {
        type: KudosRequestState,
        ref: 'kudos-request-state'
    },
    assignedBy: {
        type: EmployeeModel.schema,
        ref: 'employee'
    },
    assignedTo: {
        type: EmployeeModel.schema,
        ref: 'employee'
    },
    kudosReward: Number,
    title: String,
    comment: String,
    
    date: Date,
    assignedDate: Date,
    waitingForApprovalDate: Date,
    completedDate: Date
});

module.exports = mongoose.model('kudos-request', kudosRequestSchema);