const
    RedeemOptions = require('../other/redeem-option'),
    mongoose = require('mongoose');

const kudosRedeemSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    redeemOption: {
        type: RedeemOptions,
        ref: 'redeem-option'
    },
    date: Date
});

module.exports = mongoose.model('kudos-redeem', kudosRedeemSchema);
