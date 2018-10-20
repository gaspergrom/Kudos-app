const
    { Router } = require('express'),
    router = Router();

router.post('/slack-kudos', (req, res) => {
    console.log(req.body);
});

module.exports = router;
