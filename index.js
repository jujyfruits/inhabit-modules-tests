var path = require('path');
var Server = require('karma').Server;

module.exports = new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
    autoWatch: true
});