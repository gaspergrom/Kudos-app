const
    name = 'kudos-tx',
    pluralName = 'kudos-txs',
    Utils = require('../../other/utils'),
    employeeModel = require('../../models/employee'),
    companyModel = require('../../models/company'),
    kudosTxModel = require('../../models/kudos-tx'),
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['from', 'to'], false);

router.setEventListener('post', async (addedTx) => {
    const company = await companyModel.findById(addedTx.from.company ? addedTx.from.company : addedTx.to.company);
    const fromName = (addedTx.from.realName ? addedTx.from.realName : addedTx.from.name);
    const toName = (addedTx.to.realName ? addedTx.to.realName : addedTx.to.name);
    const text = 'Great job, ' + toName + '! *' + fromName + '* has given you *' + addedTx.amount + '* kudos with a comment: ' + addedTx.comment;

    await Utils.sendMessageAsBot(addedTx.to.slackId, text);
});

router.router.post('/' + pluralName, async (req, res) => {
    if (req && req.body) {
        const fromId = req.body.from;
        const toId = req.body.to;
        const amount = req.body.amount;
        const comment = req.body.comment;

        if (fromId !== toId) {
            const from = await employeeModel.findById(fromId);
            const to = await employeeModel.findById(toId);
    
            if (from && to && amount && comment && from.kudosToGive >= amount) {
                const kudosTx = {
                    from: from,
                    to: to,
                    amount: amount,
                    comment: comment,
                    date: new Date().getTime()
                };
    
                kudosTxModel.create(kudosTx, async (err, added) => {
                    if (err)
                        console.error('Failed to process a kudos transaction: ' + err);
                    else
                        router.emitEvent('post', added);
                    
                    await employeeModel.findByIdAndUpdate(fromId, { kudosToGive: from.kudosToGive - amount });
                    await employeeModel.findByIdAndUpdate(toId, { receivedKudos: to.receivedKudos + amount, availableKudos: to.availableKudos + amount });

                    res.json(added);
                });
            }
            else
                res.json();
        }
        else
            res.json();
    }
    else
        res.json();
});

/**
 * Returns a list of kudos transactions that suit the posted filter
 * ## params:
 * @ from (mongoose.Schema.Types.ObjectId): returns all txs sent by the specified employee ID
 * @ to (mongoose.Schema.Types.ObjectId): returns all txs sent to the specified employee ID
 * @ newerThan (Date): returns txs newer than specified date
 * @ olderThan (Date): returns txs older than specified date
 * @ maxTxs (Number): max number of transactions to return
 * ## returns: the filtered entries if successful or an empty response if not
 */
router.router.post('/' + pluralName + '/filter', (req, res) => {
    if (req && req.body) {
        const from = req.body.from;
        const to = req.body.to;
        const newerThan = req.body.newerThan;
        const olderThan = req.body.olderThan;
        const maxTxs = req.body.maxTxs ? req.body.maxTxs : 0;

        let filter = Object.assign({ },
            from ? { from } : null,
            to ? { to } : null,
            newerThan && olderThan ? { date: { $gte: newerThan, $lte: olderThan } } : newerThan ? { date: { $gte: newerThan } } : olderThan ? { date: { $lte: olderThan } } : null
        );

        var query = router.baseClass.find(filter).limit(maxTxs);
        query.exec((err, filtered) => {
            if (err)
                console.error('Error when filtering \'' + pluralName + '\'.');
            
            res.json(filtered);
        });
    }
    else
        res.json();
});

module.exports = router;
