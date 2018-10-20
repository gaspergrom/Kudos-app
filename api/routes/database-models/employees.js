const
    name = 'employee',
    pluralName = 'employees',
    BaseRouter = require('../base-router'),
    router = new BaseRouter(name, pluralName);

router.setEventListener('query', (reqRes) => {
    const query = reqRes.req.query;

    if (query.company) {
        router.baseClass.find({ company: query.company }, (err, filtered) => {
            if (err)
                console.error('Error when running query for \'' + this.pluralName + '\': ' + err);

            reqRes.res.json(filtered);
        });
    }
    else
        reqRes.res.json();
});

module.exports = router;
