const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    slackId: String,
    title: String,
    slug: String,
    departments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'department'
        }
    ]
});

module.exports = mongoose.model('company', companySchema);