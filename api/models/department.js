const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    title: String,
    slug: String
});

module.exports = mongoose.model('department', departmentSchema);