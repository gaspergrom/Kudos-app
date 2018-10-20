const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    title: String,
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    slug: String
});

module.exports = mongoose.model('department', departmentSchema);