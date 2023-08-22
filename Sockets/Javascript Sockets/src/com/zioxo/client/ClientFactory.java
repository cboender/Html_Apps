package com.zioxo.client;

import java.io.IOException;
import java.net.Socket;

import com.zioxo.Server;
import com.zioxo.listener.ClientFactoryListener;
import com.zioxo.listener.ClientListener;
import com.zioxo.message.DefaultMessageReciever;

public class ClientFactory {

	private Server server = null;

	public ClientFactory(Server server) {
		this.server = server;
	}

	/**
	 * Receives initial message from client to determine type
	 * 
	 * @param socket
	 * @param listener
	 * @return
	 * @throws IOException
	 */
	public void initializeClient(Socket socket, ClientListener listener) throws IOException {
		ClientFactoryListener fl = new ClientFactoryListener();

		DefaultMessageReciever reciever = new DefaultMessageReciever(fl, socket.getInputStream());
		reciever.setOneRun(true);
		reciever.run();

		if (fl.getException() != null) {
			throw new IOException(fl.getException().getMessage(), fl.getException());
		}
		Client c = null;
		if (fl.getMessage() != null && fl.getMessage().length > 0) {
			ClientType type = parseClientType(fl.getMessage());
			switch (type) {
			case GENERIC:
				c = Client.create(socket, listener);
				break;
			case WEBSOCKET:
				WebSocketClient wsc = new WebSocketClient(socket, listener);
				wsc.sendResponse(new String(fl.getMessage()));
				c = wsc;
				break;
			}
			// If message exists figure out the type of client that is connecting
		} else {
			// Return generic client
			c = Client.create(socket, listener);
		}
		server.addClient(c);
	}

	private ClientType parseClientType(byte[] message) {
		String header = new String(message);
		String[] parts = header.split("\r\n");
		if (parts[0].equalsIgnoreCase("GET / HTTP/1.1")) {
			for (String part : parts) {
				if (part.toLowerCase().startsWith("sec-websocket-key")) {
					return ClientType.WEBSOCKET;
				}
			}
		}
		return ClientType.GENERIC;
	}

}
