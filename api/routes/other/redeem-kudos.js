const
    routePath = '/redeem-kudos',
    employeeModel = require('../../models/employee'),
    conf = require('../../../nuxt.config'),
    { Router } = require('express'),
    router = Router();

router.get(routePath, (req, res) => {
    res.json(conf.redeemOptions);
});

router.post(routePath, async (req, res) => {
    if (req && req.body) {
        const option = req.body.redeemOption;
        const employeeId = req.body.employeeId; // MongoDB employee

        if (employeeId && option < conf.redeemOptions.length) {
            const redeemOption = conf.redeemOptions[option];
            const employee = await employeeModel.findById(employeeId).exec();

            if (employee) {
                if (redeemOption.amount <= employee.availableKudos) {
                    employee.availableKudos -= redeemOption.amount;
                    employeeModel.findByIdAndUpdate(employeeId, employee, { upsert: false }).exec((err, original) => {
                        if (err)
                            console.error('Error when patching \'' + this.tag + '\' ID ' + id + ' - problem when searching.');
                        
                        res.json(original);
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
    }
    else
        res.json();
});

module.exports = router;
