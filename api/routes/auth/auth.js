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

                    switch (req.query.state) {
                        case 'user':
                            const user = await Utils.processSlackUser(tokenData.user, tokenData.team);

                            res.json(user);
                            break;
                        case 'workspace':
                            const usersListUrl = Utils.constructUsersListRequestUrl(accessToken);
                            const teamInfoUrl = Utils.constructTeamInfoRequestUrl(accessToken);
                            const usersList = JSON.parse(await rp(usersListUrl)).members;
                            const teamInfo = JSON.parse(await rp(teamInfoUrl)).team;
                            const workspace = await Utils.processSlackWorkspace(usersList, teamInfo);

                            res.json(workspace);
                            break;
                    }
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
