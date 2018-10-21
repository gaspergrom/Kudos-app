const
    rp = require('request-promise'),
    conf = require('../../../nuxt.config'),
    EmployeeModel = require('../../models/employee'),
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
        if (amount && amount > 0 && comment && comment.length <= conf.general.kudosCommentMaxLen) {
            const slackId = toId.substring(params[0].indexOf('@') + 1, params[0].indexOf('|'));
            
            if (slackId !== fromId) {
                const toEmployee = await EmployeeModel.findOne({ slackId: slackId });
    
                if (toEmployee) {
                    msg = 'Successfully sent task request to *' + (toEmployee.realName ? toEmployee.realName : toEmployee.name) + '*';
                    attachmentMsg = 'The reward for completing this task is *' + amount + '* kudos!';
        
                    const task = {
                        state: "open",
                        assignedBy: from,
                        offeredTo: [ toEmployee ],
                        kudosReward: amount,
                        comment: comment,
                        date: new Date().getTime()
                    };

                    await rp('/tasks', { method: 'POST', baseUrl: conf.axios.baseURL, json: true, body: task });
                }
                else {
                    msg = 'Could not send task request'
                    attachmentMsg = 'The user you are trying to send kudos to might not exist.';
                }
            }
            else {
                msg = 'There was a problem sending kudos.';
                attachmentMsg = 'You cannot send kudos to yourself!';
            }
        }
        else {
            msg = 'Could not send task request'
            attachmentMsg = 'You might have entered an invalid kudos amount or the comment was too long (max *' + conf.general.kudosCommentMaxLen + '* characters)!';
        }
    }
    else { // TODO: Department
        
    }

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
