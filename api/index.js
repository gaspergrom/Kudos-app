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

// Require API routes
const
  companies = require('./routes/basic/companies'),
  employees = require('./routes/basic/employees'),
  departments = require('./routes/basic/departments'),
  kudosTxs = require('./routes/basic/kudos-txs'),
  kudosRequests = require('./routes/basic/kudos-requests');

const
  auth = require('./routes/auth/auth');

const
  slackKudos = require('./routes/commands/slack-kudos');

// Import API Routes
app.use(companies.router);
app.use(employees.router);
app.use(departments.router);
app.use(kudosTxs.router);
app.use(kudosRequests.router);

// Import login routes
app.use(auth);

// Import command routes
app.use(slackKudos);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
