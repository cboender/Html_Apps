package com.zioxo.runtime;

import com.zioxo.Server;

public class ServerRuntime {

	public ServerRuntime() {
		// TODO Auto-generated constructor stub
	}

	public static void main(String[] args) throws Exception {
		Server server = new Server();

		Thread t = new Thread(new InputListener(server));
		t.setDaemon(true);
		t.start();

		server.start();
	}
}
