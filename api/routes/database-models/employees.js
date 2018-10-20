const
    name = 'employee',
    pluralName = 'employees',
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName, ['company', 'departments']);

module.exports = router;
