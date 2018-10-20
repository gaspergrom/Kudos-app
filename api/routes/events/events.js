const
    { Router } = require('express'),
    router = Router();

router.post('/events', (req, res) => {
    if (req && req.body) {
        console.log(req.body);
        res.send(req.body.challenge);
    }
    else
        res.json();
});

module.exports = router;
