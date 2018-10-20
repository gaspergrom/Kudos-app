const
    EmployeeModel = require('../models/employee'),
    mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    title: String,
    manager: {
        type: EmployeeModel.schema,
        ref: 'employee'
    },
    slug: String
});

module.exports = mongoose.model('department', departmentSchema);