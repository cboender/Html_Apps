package com.zioxo.runtime;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import com.zioxo.Server;

public class InputListener implements Runnable {

	private Server server = null;

	public InputListener(Server server) {
		this.server = server;
	}

	public void run() {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		String line = null;
		try {
			while ((line = br.readLine()) != null) {
				if (line.equalsIgnoreCase("exit")) {
					System.exit(0);
				}
				server.sendMessage(line);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}