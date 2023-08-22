package com.zioxo.runtime;

import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

import com.zioxo.client.Client;

public class ClientTest {

	public static void main(String[] args) throws UnknownHostException, IOException {
		String host = "127.0.0.1";
		int port = 19000;
		Socket server = new Socket(host, port);

		Client client = new Client(server);

		client.send("Client: Connected");
	}

}
