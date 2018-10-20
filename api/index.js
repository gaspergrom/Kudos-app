const
  config = require('../nuxt.config'),
  express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

mongoose.connect(config.databaseConfig.url, { useNewUrlParser: true }, (err) => {
  if (err)
    throw err;
  console.log('Successfuly connected to database.');
});

// Create express instance
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Require API routes
const
  companies = require('./routes/database-models/companies'),
  employees = require('./routes/database-models/employees'),
  departments = require('./routes/database-models/departments'),
  kudosTxs = require('./routes/database-models/kudos-txs'),
  kudosTasks = require('./routes/database-models/tasks')
  kudosRedeems = require('./routes/database-models/kudos-redeems'),
  auth = require('./routes/auth/auth'),
  slackKudos = require('./routes/commands/slack-kudos'),
  events = require('./routes/events/events');

// Import API Routes
app.use(companies.router);
app.use(employees.router);
app.use(departments.router);
app.use(kudosTxs.router);
app.use(kudosTasks.router);
app.use(kudosRedeems.router);

// Import login routes
app.use(auth);

// Import event routes
app.use(events);

// Import command routes
app.use(slackKudos);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
