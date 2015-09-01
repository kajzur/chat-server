module.exports = {
	validateToken : function(token){
		return true;
	},
	getIdByToken: function(token){
		return token;
	},
	getParameters:function(path){
		var allowedParameters = ["token"];
		var parsedParameters = {};
		var pairs = path.replace("/?","").split("&");
		for(var pairIndex=0;pairIndex<pairs.length;pairIndex++){
			var pairArray = pairs[pairIndex].split("=");
			if(allowedParameters.indexOf(pairArray[0]) < 0){
				throw "Illegal parameter!!";
			}
			parsedParameters[pairArray[0]] = pairArray[1];
		}
		return parsedParameters;
	},
	getChannelName: function(config, userId){
		return config['redis']['prefix']+":"+userId+"_*_talk";
	},
	getDestinationChannelName: function(config, destUserId, currentUserId){
		return config['redis']['prefix']+":"+destUserId+"_"+currentUserId+"_talk";
	},
	capitalizeFirstLetter: function	(string) {
    	return string.charAt(0).toUpperCase() + string.slice(1);
	},
	isFunction: function(obj) {
  		return !!(obj && obj.constructor && obj.call && obj.apply);
	},
	FUNCTION:'[object Function]'
}
