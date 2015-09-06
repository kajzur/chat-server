var id = window.location.hash.substr(1);
var id2 = (id == 1?2:1);

var exampleSocket = new WebSocket("ws://localhost:3333?token="+id);
exampleSocket.onmessage = function (event) {
	var msg = JSON.parse(event.data);
	if(msg[0] === undefined){	

		var validMessage = JSON.parse(msg.message);
		document.getElementById("tresc").innerText+=validMessage.text+"\n";
		console.log(msg)
	}
	
}
exampleSocket.onopen = function(event){
	console.info("connected.")
}

document.getElementById("send").onclick = function(){
	var result = prompt("Wiadomosc:");
	var to = prompt("Do kogo:");
	if(result && to){
		exampleSocket.send(JSON.stringify({
			text:result,
			dateTime: Date.now(),
			from:id,
			to:to
		}));
	}
}
