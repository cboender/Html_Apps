package com.zioxo.client;

import java.io.IOException;
import java.net.Socket;
import java.net.SocketException;

import com.zioxo.listener.ClientListener;
import com.zioxo.listener.MessageListener;
import com.zioxo.message.BaseMessageReciever;
import com.zioxo.message.DefaultMessageReciever;

public class Client implements MessageListener {

	protected Socket socket = null;

	protected ClientListener listener = null;

	private Thread recieveThread = null;

	public Client(Socket socket) throws IOException {
		this(socket, null);
	}

	public Client(Socket socket, ClientListener listener) throws IOException {
		this.socket = socket;
		this.listener = listener;

		recieveThread = new Thread(getMessageReciever());
		recieveThread.start();
	}

	protected BaseMessageReciever getMessageReciever() throws IOException {
		return new DefaultMessageReciever(this, socket.getInputStream());
	}

	public static Client create(Socket socket, ClientListener listener) throws IOException {
		return new Client(socket, listener);
	}

	public void send(String message) throws IOException {
		send(message.getBytes("UTF-8"));
	}

	public void send(byte[] message) throws IOException {
		socket.getOutputStream().write(message);
	}

	public void messageRecieved(byte[] message) {
		System.out.println(new String(message));
	}

	public void exceptionOccured(Throwable t) {
		if (listener == null) {
			return;
		}
		if (t instanceof SocketException) {
			listener.clientDisconnected(this);
		} else {
			t.printStackTrace();
		}
	}
}
