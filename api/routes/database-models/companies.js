const
    CompanyModel = require('../../models/company'),
    EmployeeModel = require('../../models/employee'),
    DepartmentModel = require('../../models/department'),
    name = 'company',
    pluralName = 'companies',
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['departments']);

router.router.post('/' + pluralName + '/:id/departments', async (req, res) => {
    if (req && req.params && req.body && req.params.id) {
        const id = req.params.id;
        let company = await CompanyModel.findById(id);
        
        if (company) {
            DepartmentModel.create(req.body, (err, added) => {
                if (err) {
                    console.error('Failed to create a department: ' + err);
                    res.json();
                }
                else {
                    company.departments.push(added);
                    CompanyModel.findByIdAndUpdate(id, company, (err, original) => {
                        if (err)
                            console.error('Failed to update company ID \'' + id + '\' with department: ' + err);
                        
                        res.json(company);
                    });
                }
            });
        }
        else
            res.json();
    
        data.exec((err, found) => {
            if (err)
                console.error('Error when fetching \'' + this.tag + '\' ID ' + id);
    
            res.json(found);
        });
    }
    else
        res.json();
});

/**
 * Returns an array of all employees of the specified company
 */
router.router.get('/' + pluralName + '/:id/employees', (req, res) => {
    if (req && req.params && req.params.id) {
        const id = req.params.id;

        EmployeeModel
            .find({ company: id })
            .populate('departments')
            .exec((err, filtered) => {
                if (err)
                    console.error('Error when searching for employees of company \'' + id + '\': ' + err);

                res.json(filtered);
            });
    }
    else
        res.json();
});

module.exports = router;
