const
    name = 'task',
    pluralName = 'tasks',
    taskModel = require('../../models/task'),
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['assignedBy', 'assignedTo'], false);

router.setEventListener('post', (added) => {
    console.log('New task - notify involved users');
});

router.setEventListener('patch', (edited) => {
    console.log('Task changed - notify involved users');
});

router.router.post('/' + pluralName, async (req, res) => {
    if (req && req.body) {
        req.body.state = 'open';
        req.body.date = new Date().getTime();

        taskModel.create(req.body, (err, added) => {
            if (err)
                console.error('Error when trying to create a task: ' + err);
            else
                router.emitEvent('post', added);
            
            res.json(added);
        });
    }
    else
        res.json();
});

router.router.patch('/' + pluralName + '/:id', async (req, res) => {
    if (req && req.body && req.params && req.params.id) {
        const id = req.params.id;
        req.body.date = new Date().getTime();

        taskModel
            .findByIdAndUpdate(id, req.body, { upsert: false })
            .populate('assignedBy')
            .populate('assignedTo')
            .exec((err, original) => {
                if (err)
                    console.error('Failed to update a task: ' + err);
                else
                    router.emitEvent('patch', req.body);
                
                res.json(req.body);
            });
    }
    else
        res.json();
});

module.exports = router;
