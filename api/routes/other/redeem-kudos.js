const
    employeeModel = require('../../models/employee'),
    conf = require('../../../nuxt.config'),
    { Router } = require('express'),
    router = Router();

router.post('/redeem-kudos', (req, res) => {
    if (req && req.body) {
        const option = req.body.redeemOption;
        const employee = req.body.employee; // MongoDB employee

        console.log('option ' + option + ' for employee ' + employee)
        if (employee && option < conf.redeemOptions.length) {
            const redeemOption = conf.redeemOptions[option];

            if (redeemOption.amount <= employee.availableKudos) {
                employee.availableKudos -= redeemOption.amount;
                employeeModel.findByIdAndUpdate(employee['_id'], employee, { upsert: false }).exec((err, original) => {
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
});

module.exports = router;
