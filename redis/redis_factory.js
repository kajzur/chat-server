var redis = require("redis"); 

module.exports = {
	getRedisClient: function(config){
		return redis.createClient(config['redis']['serverport'], config['redis']['serverurl'],{});
	}
} 
