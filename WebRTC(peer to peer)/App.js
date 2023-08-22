(App = function() {
	var connection;
	function start(containerId) {
		createConnection(containerId);
		connection.start();
	}
	
	function createConnection(containerId) {
		let data = {
			offerCreated : function(session, candidate) {
				let json = {
					session: session,
					candidate: candidate
				}
				
				var holder = getElement(containerId);
				holder.innerHTML = JSON.stringify(json);
			}
		}
		connection = new Connection(data);
	}
	
	function join(inputId, containerId) {
		var input = getElement(inputId);
		var data = expandData(input.value);
		createConnection(containerId);
		connection.join(data);
		print("Started Joining the Connection");
	}
	
	function importResponse(inputId) {
		var input = getElement(inputId);
		var data = expandData(input.value);
		connection.importResponse(data);
		
	}
	
	function expandData(data) {
		let remote = JSON.parse(data);
		return {
			session : new RTCSessionDescription(remote.session),
			candidate:  new RTCIceCandidate(remote.candidate)
		}
    }
	
	function send(element) {
		var data = getElement("Data").value;
		print("Sent:" + data);
		connection.send(data);
	}

	return {
		start : start,
		join : join,
		send : send,
		importResponse : importResponse
	}
}());