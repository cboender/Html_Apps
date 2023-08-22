function start(initalizer) {
    var pc =  createConnection();
    if (initalizer) {
       createOffer(pc);
       print("Connection made for initialzation");
    } else {
        print("Connection made for connecting");
    }
    
    
    return pc;
}

function createOffer(pc) {
      pc.con.createOffer().then(function(data) {
      pc.con.setLocalDescription(data);
      pc.ansReply = data;
    });
}

function createReply(pc) {
    pc.con.createAnswer().then(function(response) {
    pc.con.setLocalDescription(response);
    
    pc.ansReply = response;
});
}

 function createConnection() {
    var servers = null;
    var dataConstraint = null;
    let pc = new RTCPeerConnection(servers);
    
    var pcWrapper = {
          con: pc,
          candidate: []
    }
    pc.ondatachannel = function(event) {
        recieveChannel = event.channel;
        recieveChannel.onmessage = onReceive;
        recieveChannel.onopen= function() {onReceiveChannelStateChange(recieveChannel) };
        recieveChannel.onclose= function() {onReceiveChannelStateChange(recieveChannel) };
    }
    
    pc.onicecandidate = function(event) { 
        onicecandidate(pcWrapper, event);
    }
        
    let sendChannel = pc.createDataChannel("sendDataChannel",dataConstraint);
    sendChannel.onopen = function() {
        print("Send Channel Opened");
    }
    pcWrapper.sc = sendChannel;
    
    return pcWrapper;
}

        
var onicecandidate = function(con, event) {
    if (event.candidate) {
        con.candidate.push(event.candidate);
    }
      //con.addIceCandidate(event.candidate).then(function() {console.log('added')}, function(evt) {print(evt.toString())});
}

   
function onReceive(event) {
    print("Received: " + event.data);
}

function onReceiveChannelStateChange(channel) {
    var readyState = channel.readyState;
    print('Receive channel state is: ' + readyState);
    
}

function printSupport() {
            var allowRTC = !!window.RTCPeerConnection;
            var mediaSupported = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
            var dataSupported = !!(RTCPeerConnection.prototype.createDataChannel);
            print("RTC allowed: " + allowRTC);
            print("Media Support: " + mediaSupported);
            print("Data Support: " + dataSupported);
        }
        
function getJSON(data) {
    var json;
    console.log(data);
    if (data.toJSON) {
        json = data.toJSON();
    } else {
        json = data;
    }
    return json;
}