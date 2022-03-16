const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const path = require('path');
const ParseDashboard = require('parse-dashboard');
const configuration = require('./config');

const test = configuration.NODE_ENV !== 'production';

const dashboard = new ParseDashboard(configuration.dashboardConfig, { allowInsecureHTTP: true });

const app = express();

app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(configuration.ADMIN_PATH, dashboard);

const mountPath = configuration.PARSE_MOUNT;
const api = new ParseServer(configuration.appConfig);
app.use(mountPath, api);

app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

if (test) {
  app.get('/test', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/test.html'));
  });
}

const port = configuration.PORT;

const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server running on port ' + port + '.');
});
// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);

module.exports = {
  app: app,
  config: configuration.appConfig,
};
