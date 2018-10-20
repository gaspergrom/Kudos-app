const
    name = 'department',
    pluralName = 'departments',
    EmployeeModel = require('../../models/employee'),
    DepartmentsModel = require('../../models/department'),
    Utils = require('../../other/utils'),
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, false);

router.router.post('/' + pluralName, async (req, res) => {
    if (req && req.body) {
        const managerId = req.body.manager;
        const manager = await EmployeeModel.findById(managerId);

        if (manager) {
            req.body.manager = manager;
            req.body.slug = Utils.generateSlug(req.body.title);

            DepartmentsModel.create(req.body, (err, added) => {
                if (err)
                    console.error('Failed to add a department: ' + err);
                
                manager.departments.push(added);
                EmployeeModel
                    .findByIdAndUpdate(managerId, manager)
                    .populate('company')
                    .populate('departments')
                    .exec((err, original) => {
                        if (err)
                            console.error('Failed to add manager to created department: ' + err);
                        
                        res.json(added);
                    });
            });
        }
        else
            res.json();
    }
    else
        res.json();
});

module.exports = router;
