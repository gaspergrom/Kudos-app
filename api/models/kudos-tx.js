const
    EmployeeModel = require('./employee'),
    mongoose = require('mongoose');

const kudosTxSchema = new mongoose.Schema({
    from: {
        type: EmployeeModel.schema,
        ref: 'employee'
    },
    to: {
        type: EmployeeModel.schema,
        ref: 'employee'
    },
    amount: Number,
    comment: String,
    date: Date
});

module.exports = mongoose.model('kudos-tx', kudosTxSchema);