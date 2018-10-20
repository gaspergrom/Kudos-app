const
    employeeModel = require('../../models/employee'),
    name = 'company',
    pluralName = 'companies',
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName);

router.router.get('/' + pluralName + '/:id/employees', (req, res) => {
    if (req && req.params && req.params.id) {
        const id = req.params.id;

        employeeModel.find({ company: id }, (err, filtered) => {
            if (err)
                console.error('Error when searching for employees of company \'' + id + '\': ' + err);

            res.json(filtered);
        });
    }
    else
        res.json();
});

module.exports = router;
