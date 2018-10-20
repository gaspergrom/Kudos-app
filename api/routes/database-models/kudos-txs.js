const
    name = 'kudos-tx',
    pluralName = 'kudos-txs',
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName);

router.setEventListener('post', (added) => {
    console.log('New kudos TX - TODO: notify involved user(s)');
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