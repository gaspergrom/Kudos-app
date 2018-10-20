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
  companies = require('./routes/database-models/companies'),
  employees = require('./routes/database-models/employees'),
  departments = require('./routes/database-models/departments'),
  kudosTxs = require('./routes/database-models/kudos-txs'),
  kudosRequests = require('./routes/database-models/kudos-requests'),
  auth = require('./routes/auth/auth'),
  slackKudos = require('./routes/commands/slack-kudos'),
  events = require('./routes/events/events'),
  redeemKudos = require('./routes/other/redeem-kudos');

// Import API Routes
app.use(companies.router);
app.use(employees.router);
app.use(departments.router);
app.use(kudosTxs.router);
app.use(kudosRequests.router);

// Import login routes
app.use(auth);

// Import event routes
app.use(events);

// Import command routes
app.use(slackKudos);

// Import other routes
app.use(redeemKudos);

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
