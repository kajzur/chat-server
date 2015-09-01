var id = window.location.hash.substr(1);
var id2 = (id == 1?2:1);

var exampleSocket = new WebSocket("ws://localhost:3333?token="+id);
exampleSocket.onmessage = function (event) {
	var msg = JSON.parse(event.data);
	console.log(msg.message)
}
exampleSocket.onopen = function(event){
	exampleSocket.send(JSON.stringify({
		text:"test. Wysyłam do "+id2,
		dateTime: Date.now(),
		from:id,
		to:id2
	}));
}
