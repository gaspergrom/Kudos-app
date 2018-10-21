const
    rp = require('request-promise'),
    conf = require('../../../nuxt.config'),
    KudosTxModel = require('../../models/kudos-tx'),
    EmployeeModel = require('../../models/employee'),
    { Router } = require('express'),
    router = Router();

router.post('/commands/kudos', async (req, res) => {
    const
        params = req.body.text.split(' '),
        fromId = req.body.user_id,
        from = await EmployeeModel.findOne({ slackId: fromId }),
        toId = params[0].substring(params[0].indexOf('@') + 1, params[0].indexOf('|')),
        to = await EmployeeModel.findOne({ slackId: toId }),
        amount = Number.parseInt(params[1]),
        comment = params.slice(2, params.length).join(' ');
    
    let msg;
    let attachmentMsg;
    if (from && to && amount && amount.constructor == Number) {
        if (comment && comment.length < conf.general.kudosCommentMaxLen) {
            if (from.kudosToGive >= amount) {
                msg = 'Sending *' + amount + '* kudos to *' + (to.realName ? to.realName : to.name) + '*: ' + comment;
                attachmentMsg = 'You can give away *' + (from.kudosToGive - amount) + '* more kudos!';
    
                const kudosTx = {
                    from: from._id,
                    to: to._id,
                    amount: amount,
                    comment: comment,
                    date: new Date().getTime()
                };
    
                await rp('/kudos-txs', { method: 'POST', baseUrl: conf.axios.baseURL, json: true, body: kudosTx });
                // await rp('/employees/' + from,_id, { method: 'PATCH', baseUrl: conf.axios.baseURL, json: true, body: { kudosToGive: from.kudosToGive - amount } });
                // await rp('/employees/' + to._id, { method: 'PATCH', baseUrl: conf.axios.baseURL, json: true, body: { receivedKudos: to.receivedKudos + amount, availableKudos: to.availableKudos + amount } });
            }
            else {
                msg = 'You do not have enough kudos available';
                attachmentMsg =  'You have *' + from.kudosToGive + '* kudos to give away';
            }
        }
        else {
            msg = 'There was a problem sending kudos.';
            attachmentMsg = 'Your comment is too long (max *' + conf.general.kudosCommentMaxLen + '* characters)!';
        }
    }
    else {
        msg = 'There was a problem sending kudos.';
        attachmentMsg = 'The user you are trying to send kudos to might not exist?';
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
