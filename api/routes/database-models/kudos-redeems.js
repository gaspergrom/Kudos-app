const
    name = 'kudos-redeem',
    pluralName = 'kudos-redeems',
    conf = require('../../../nuxt.config'),
    kudosRedeemModel = require('../../models/kudos-redeem'),
    employeeModel = require('../../models/employee'),
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['employee'], false);

router.router.get('/' + pluralName + '-options', (req, res) => {
    res.json(conf.redeemOptions);
});

router.router.post('/' + pluralName, async (req, res) => {
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
                    employeeModel
                        .findByIdAndUpdate(employeeId, employee, { upsert: false })
                        .exec((err, original) => {
                            if (err) {
                                console.error('Error when updating employee available token data during kudos redeem: ' + err);
                                res.json();
                            }
                            else {
                                kudosRedeemModel
                                    .create(kudosRedeem)
                                    .exec((err, added) => {
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
