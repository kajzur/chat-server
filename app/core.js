var connectionsPool = {}
var dataBaseConnection = undefined;
var logger = require('winston');
var config = require('../config/config.json');
var redis = require('../redis/redis_factory')
var utils = require('../utils/utils')
var Factory = require('../models/factory')

var onMessageReceive = function(str){
	var message = Factory.Message.getFromJson(str);
	var destinationChannel = utils.getDestinationChannelName(config, message.to, message.from);
	logger.info("Publish message to channel "+destinationChannel);
	var res = redis.getRedisClient(config).publish(destinationChannel, JSON.stringify(message), function(){
		var online = arguments[1] >= 1;
		if(!online){
			logger.info(destinationChannel + "receiver is not online")
			//TO DO: HANDLE WHEN SOMEONE IS NOT ONLINE
		}
	});
}

var onClose = function(code, reason){
	connectionsPool[utils.getParameters(this.path)['token']].redis.end();
}

var generateBuddies = function(){
	return JSON.stringify(
		[{
			"type":"buddies",
			"name":"test",
			"id":"20"
		}]
	);
}

module.exports = {
	serverListener: function (conn) {
    	logger.info('New client connected.');
    	conn.sendText(generateBuddies());
    	var parameters = utils.getParameters(conn.path);
    	var id = utils.getIdByToken(parameters['token']);
    	var client = redis.getRedisClient(config);
    	connectionsPool[id] = {connection:conn, redis:client};
    	client.psubscribe(utils.getChannelName(config, id));
    	logger.info("Creating channel: "+utils.getChannelName(config, id));
    	client.on("pmessage", function(pattern, channel, message){
    		var userid = pattern.split(":")[1].split("_")[0];
    		connectionsPool[userid].connection.sendText(JSON.stringify({message:message, date:Date.now()}));
    	});  
    	conn.on("text", onMessageReceive);
    	conn.on("close", onClose);
	}
}

