const
    rp = require('request-promise'),
    EmployeeModel = require('../../models/employee'),
    TaskModel = require('../../models/task'),
    { Router } = require('express'),
    router = Router();

router.post('/events/interactive', async (req, res) => {
    if (req && req.body) {
        const payload = JSON.parse(req.body.payload);
        if (payload.callback_id == 'task_decision') {
            const taskId = payload.actions[0].value;
            const employee = await EmployeeModel.findOne({ slackId: payload.user.id });
            const rpBody = { 
                method: 'POST',
                uri: payload.response_url,
                headers: {
                    'Content-type': 'application/json; charset=utf-8'
                },
                body: {
                    text: '',
                    replace_original: true
                },
                json: true
            };

            if (taskId != -1) {
                TaskModel.findByIdAndUpdate(taskId, { state: 'running', assignedTo: employee, assignedDate: new Date().getTime() }, async (err, original) => {
                    let msg;
                    if (err)
                        msg = 'Oops, something went wrong when assigning you to the task!';
                    else
                        msg = 'I have assigned you to the task!';
                    
                    rpBody.body.text = msg;
                    await rp(rpBody);
                    res.json();
                });
            }
            else {
                rpBody.body.text = 'Okay, I declined the task for you.';
                await rp(rpBody);
                res.json();
            }
        }
        else
            res.json();
    }
    else
        res.json();
});

module.exports = router;
