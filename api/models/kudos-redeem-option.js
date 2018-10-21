const mongoose = require('mongoose');

const kudosRedeemOptionSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    imgPath: String
});

module.exports = mongoose.model('kudos-redeem-option', kudosRedeemOptionSchema);
