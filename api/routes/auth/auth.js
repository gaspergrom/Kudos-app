const
    { Router } = require('express'),
    rp = require('request-promise'),
    Utils = require('../../other/utils'),
    router = Router();

router.get('/auth', (req, res) => {
    if (req && req.query && req.query.code) {
        const url = Utils.constructAccessTokenRequestUrl(req.query.code);

        rp(url)
            .then(async (body) => {
                if (body) {
                    const tokenData = JSON.parse(body);
                    const accessToken = tokenData.access_token;
                    const usersListUrl = Utils.constructUsersListRequestUrl(accessToken);
                    const teamInfoUrl = Utils.constructTeamInfoRequestUrl(accessToken);
                    const usersList = JSON.parse(await rp(usersListUrl)).members;
                    const teamInfo = JSON.parse(await rp(teamInfoUrl)).team;
                    const processed = await Utils.processSlackWorkspace(usersList, teamInfo);

                    res.json(processed);
                }
                else
                    res.json();
            })
            .catch((err) => {
                console.error('Error when requesting access data from Slack: ' + err);
                res.json();
            });
    }
    else
        res.json();
});

module.exports = router;
