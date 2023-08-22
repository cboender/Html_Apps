package com.zioxo;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.ArrayList;
import java.util.List;

import com.zioxo.client.Client;
import com.zioxo.client.ClientFactory;
import com.zioxo.listener.ClientListener;

public class Server implements ClientListener {

	private int port = 19000;

	private ServerSocket socket = null;

	private List<Client> clients = new ArrayList<>();

	ClientFactory clientFactory = null;

	public Server() {
		clientFactory = new ClientFactory(this);
	}

	public void start() throws IOException {
		socket = new ServerSocket(port);

		while (true) {
			try {
				createClient();
			} catch (IOException exp) {
				exp.printStackTrace();
			}
		}
	}

	private void createClient() throws IOException {
		Socket clientSocket = socket.accept();
		clientFactory.initializeClient(clientSocket, this);

	}

	public void addClient(Client client) {
		this.clients.add(client);
	}

	@Override
	public void clientDisconnected(Client client) {
		System.out.println("Client: Disconnected");
		clients.remove(client);
	}

	public void sendMessage(String message) throws IOException {
		for (Client client : clients) {
			client.send(message);
		}
	}
}
