const
    BaseRouter = require('../base-router'),
    router = new BaseRouter('task', 'tasks');

router.setEventListener('post', (added) => {
    console.log('New kudos request - TODO: notify involved user(s)');
});

module.exports = router;
