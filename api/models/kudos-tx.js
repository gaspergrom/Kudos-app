const mongoose = require('mongoose');

const kudosTxSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    amount: Number,
    comment: String,
    date: Date
});

module.exports = mongoose.model('kudos-tx', kudosTxSchema);