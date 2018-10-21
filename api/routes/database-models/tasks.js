const
    name = 'task',
    pluralName = 'tasks',
    Utils = require('../../other/utils'),
    taskModel = require('../../models/task'),
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['assignedBy', 'assignedTo'], false);

router.setEventListener('post', async (addedTask) => {
    if (addedTask && addedTask.offeredTo) {
        for (let i = 0; i < addedTask.offeredTo.length; i++) {
            const employee = addedTask.offeredTo[i];
            const msg = {
                text: '*' + (addedTask.assignedBy.realName ? addedTask.assignedBy.realName : addedTask.assignedBy.name) + '* has asked you to do a task for *' + addedTask.kudosReward + '* kudos: ' + addedTask.comment,
                attachments: [
                    {
                        "text": "Would you like to accept the task?",
                        "fallback": "You are unable to make a decision on this task.",
                        "callback_id": "task_decision",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "actions": [
                            {
                                "name": "decision",
                                "text": "Yes, I'll do it",
                                "type": "button",
                                "value": addedTask._id
                            },
                            {
                                "name": "decision",
                                "text": "I can't do it right now",
                                "style": "danger",
                                "type": "button",
                                "value": -1
                            }
                        ]
                    }
                ]
            };

            await Utils.sendMessageAsBot(employee.slackId, msg);
        }
    }
    else
        console.warn('Could not notify users of new task - invalid task object.');
});

router.setEventListener('patch', (editedTask) => {
    console.log('Task changed - notify involved users');
});

router.router.post('/' + pluralName, async (req, res) => {
    if (req && req.body) {
        req.body.state = 'open';
        req.body.date = new Date().getTime();

        taskModel.create(req.body, (err, added) => {
            if (err)
                console.error('Error when trying to create a task: ' + err);
            else {
                req.body._id = added._id;
                router.emitEvent('post', req.body);
            }
            
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
