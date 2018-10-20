const
    name = 'department',
    pluralName = 'departments',
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['manager', 'members']);

module.exports = router;
