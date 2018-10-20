const
    name = 'task',
    pluralName = 'tasks',
    employeeModel = require('../../models/employee'),
    taskModel = require('../../models/task'),
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, false);

router.router.post('/' + pluralName, async (req, res) => {
    if (req && req.body) {
        const assignedById = req.body.assignedBy;
        const assignedBy = await employeeModel.findById(assignedById);

        if (assignedBy) {
            req.body.assignedBy = assignedBy;
            req.body.date = new Date().getTime();

            taskModel.create(req.body, (err, added) => {
                if (err)
                    console.error('Error when trying to create a task: ' + err);
                
                res.json(added);
            });
        }
        else
            res.json();
    }
    else
        res.json();
});

router.router.patch('/' + pluralName + '/:id', async (req, res) => {
    if (req && req.body && req.params && req.params.id) {
        const id = req.params.id;
        const assignedToId = req.body.assignedTo;
        const assignedTo = await employeeModel.findById(assignedToId);

        if (assignedTo) {
            req.body.assignedTo = assignedTo;
            req.body.date = new Date().getTime();

            taskModel.findByIdAndUpdate(id, req.body, { upsert: false }, (err, original) => {
                if (err)
                    console.error('Failed to update a task: ' + err);
                
                res.json(req.body);
            });
        }
        else
            res.json();
    }
    else
        res.json();
});

module.exports = router;
