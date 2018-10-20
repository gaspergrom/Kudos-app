const
    EmployeeModel = require('../models/employee'),
    RedeemOptions = require('../other/redeem-option'),
    mongoose = require('mongoose');

const kudosRedeemSchema = new mongoose.Schema({
    employee: {
        type: EmployeeModel.schema,
        ref: 'employee'
    },
    redeemOption: {
        type: RedeemOptions,
        ref: 'redeem-option'
    },
    date: Date
});

module.exports = mongoose.model('kudos-redeem', kudosRedeemSchema);
