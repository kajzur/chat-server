var utils = require('../utils/utils');
console.log(utils)
function Message (txt,datetime,from,to) {
	this.text = txt;
	this.dateTime = datetime;
	this.from = from;
	this.to = to;
	this.setText = function(txt){
		this.text = txt;
	};
	this.setDateTime = function(datetime){
		this.dateTime =datetime;
	};
	this.setFrom = function(from){
		this.from = from;
	};
	this.setTo = function(to){
		this.to = to;
	};
};

Message.getBlankMessage = function(first_argument) {
	return new Message();
};

Message.getMessageFromParameters = function(txt,datetime,from,to){
	return new Message(txt,datetime,from,to);
}

Message.getFromJson = function(rawJson){
	var obj = JSON.parse(rawJson);
	var blank = Message.getBlankMessage();
	for (var name in blank) {
	  if (blank.hasOwnProperty(name) && !utils.isFunction(blank[name]) ) {
	    if(obj[name] === undefined){
	    	throw "INVALID JSON. Missing "+name+" field!";
	    }
	    blank["set"+utils.capitalizeFirstLetter(name)](obj[name]);
	  }
	}

	return blank;
}

module.exports = {
	"Message" : Message
}
