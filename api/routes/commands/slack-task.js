const
    TaskModel = require('../../models/kudos-tx'),
    EmployeeModel = require('../../models/employee'),
    DepartmentModel = require('../../models/department'),
    { Router } = require('express'),
    router = Router();

router.post('/commands/task', async (req, res) => {
    const
        params = req.body.text.split(' '),
        fromId = req.body.user_id,
        from = await EmployeeModel.findOne({ slackId: fromId }),
        toId = params[0],
        amount = Number.parseInt(params[1]),
        comment = params.slice(2, params.length).join(' ');
        
    let msg;
    let attachmentMsg;
    if (toId && toId[1] == '@') { // Employee
        const slackId = toId.substring(params[0].indexOf('@') + 1, params[0].indexOf('|'));
        const toEmployee = await EmployeeModel.findOne({ slackId: slackId });

        if (toEmployee) {
            msg = 'Successfully sent task request to ' + toEmployee.realName ? toEmployee.realName : toEmployee.name;
            attachmentMsg = 'The reward for completing this task is ' + amount + ' kudos!';

            const task = {
                state: 'open',
                assignedBy: from._id,
                offeredTo: [ toEmployee._id ],
                kudosReward: amount,
                comment: comment,
                date: new Date().getTime()
            };
    
            await TaskModel.create(task);
        }
        else {
            msg = 'Could not send task request'
            attachmentMsg = 'The user might not exist?';
        }
    }
    else { // TODO: Department
        
    }
    // let msg;
    // let attachmentMsg;
    // if (from && to) {
    //     msg = 'Asking ' + to. + ' kudos to ' + (to.realName ? to.realName : to.name) + ': ' + comment;
    //     attachmentMsg = 'You can give away *' + (from.kudosToGive - amount) + '* more kudos!';

    //     const kudosTx = {
    //         from: from._id,
    //         to: to._id,
    //         amount: amount,
    //         comment: comment,
    //         date: new Date().getTime()
    //     };

    //     await KudosTxModel.create(kudosTx);
    //     await EmployeeModel.findByIdAndUpdate(from._id, { kudosToGive: from.kudosToGive - amount });
    //     await EmployeeModel.findByIdAndUpdate(to._id, { receivedKudos: to.receivedKudos + amount, availableKudos: to.availableKudos + amount });
    // }
    // else {
    //     msg = 'There was a problem sending kudos.';
    //     attachmentMsg = 'The user you are trying to send kudos to might not exist?';
    // }

    res.json({
        'text': msg,
        'attachments': [
            {
                'text': attachmentMsg
            }
        ]
    });
});

module.exports = router;
