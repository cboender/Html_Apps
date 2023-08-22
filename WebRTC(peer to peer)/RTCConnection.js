class Connection {
	//The internal connection
	con;
	constructor(data) {
		this.data = data;
		printSupport();
		this.createConnection();
	}
	
	start() {
		this.createOffer();
		print("Connection made for initialzation");
	}
	
	join(request) {
		var $this = this;
		this.con.setRemoteDescription(request.session);
		this.con.addIceCandidate(request.candidate).then(
			function() {
				/* do nothing */
			},
			function(evt) {
				//Failure. print error message
				print(evt.toString())
			}
		);
	
		this.con.createAnswer().then(function(response) {
			$this.con.setLocalDescription(response);
		});
	}
	
	importResponse(response) {
		this.con.setRemoteDescription(response.session);
		this.con.addIceCandidate(response.candidate).then(
			function() {
				// Do Nothing
			}, 
			function(evt) {
				print(evt.toString())
			}
		);
	}
	
	createConnection() {
		var $this = this;
		var servers = null;
		var dataConstraint = null;
		this.con = new RTCPeerConnection(servers);
		this.candidates = [];
		//TODO enhance. Will handle auto reconnect
		function onReceiveChannelStateChange(channel) {
			var readyState = channel.readyState;
			print('Receive channel state is: ' + readyState);
		}
		
		//TODO make value passed from App
		function onReceive(event) {
			print("Received: " + event.data);
		}

		this.con.ondatachannel = function(event) {
			$this.recieveChannel = event.channel;
			event.channel.onmessage = onReceive;
			event.channel.onopen= function() {onReceiveChannelStateChange(this) };
			event.channel.onclose= function() {onReceiveChannelStateChange(this) };
		}
		
		this.con.onicecandidate = function(event) { 
			//The RTCSession Description and and canidate values
			if (event.candidate && $this.data.offerCreated) {
				$this.data.offerCreated(event.target.localDescription, event.candidate);
			}
		}
			
		let sendChannel = this.con.createDataChannel("sendDataChannel",dataConstraint);
		sendChannel.onopen = function() {
			print("Send Channel Opened");
		}
		this.sc = sendChannel;
	}
	
	createOffer() {
		var $this = this;
		this.con.createOffer().then(function(data) {
			$this.con.setLocalDescription(data);
		});
	}
	
	send(text) {
		if(this.recieveChannel) {
			this.sc.send(text);
		}
	}
}

function printSupport() {
	var allowRTC = !!window.RTCPeerConnection;
	var mediaSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
	var dataSupported = !!(RTCPeerConnection.prototype.createDataChannel);
	print("RTC allowed: " + allowRTC);
	print("Media Support: " + mediaSupported);
	print("Data Support: " + dataSupported);
}