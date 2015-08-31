var connectionsPool = {}

var onMessageReceive = function(str){

}

var onClose = function(code, reason){

}
module.exports = {
	serverListener: function (conn) {
    	logger.info('New client connected.');
    	conn.on("text", onMessageReceive);
    	conn.on("close", onClose);
	}
}

