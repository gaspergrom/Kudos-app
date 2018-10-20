const
    routePath = '/transact-kudos',
    employeeModel = require('../../models/employee'),
    kudosTxModel = require('../../models/kudos-tx'),
    { Router } = require('express'),
    router = Router();

router.post(routePath, async (req, res) => {
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
    
                kudosTxModel.create(kudosTx, (err, added) => {
                    if (err)
                        console.error('Failed to process a kudos transaction: ' + err);
                    
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

module.exports = router;
