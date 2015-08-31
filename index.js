var config = require('./config/config.json');
var webSocket = require('nodejs-websocket');
var logger = require('winston');
var core = require('./app/core.js');
var server = webSocket.createServer(core.serverListener).listen(config['app']['port'])
