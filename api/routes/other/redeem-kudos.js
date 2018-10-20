const
    routePath = '/redeem-kudos',
    kudosRedeemModel = require('../../models/kudos-redeem'),
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
        const employeeId = req.body.employeeId; // MongoDB employee ID

        if (employeeId && option < conf.redeemOptions.length) {
            const redeemOption = conf.redeemOptions[option];
            const employee = await employeeModel.findById(employeeId).exec();
            const kudosRedeem = {
                employee: employee,
                redeemOption: redeemOption,
                date: new Date().getTime()
            };

            if (employee) {
                if (redeemOption.amount <= employee.availableKudos) {
                    employee.availableKudos -= redeemOption.amount;
                    await employeeModel.findByIdAndUpdate(employeeId, employee, { upsert: false }).exec((err, original) => {
                        if (err) {
                            console.error('Error when updating employee available token data during kudos redeem: ' + err);
                            res.json();
                        }
                        else {
                            kudosRedeemModel.create(kudosRedeem, (err, added) => {
                                if (err)
                                    console.error('Error when adding a kudos redeem: ' + err);
                                
                                res.json(added);
                            });
                        }
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
