package com.zioxo.message;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

import com.zioxo.listener.MessageListener;

public class WebSocketMessageReciever extends BaseMessageReciever {

	private static final int BUFFER_SIZE = 1024;

	public WebSocketMessageReciever(MessageListener listener, InputStream input) {
		super(listener, input);
	}

	@Override
	public void run() {
		BufferedInputStream bis = new BufferedInputStream(input);
		try {
			byte[] data = new byte[BUFFER_SIZE];
			int read = 0;

			while ((read = bis.read(data)) > 0) {
				// TODO Handle messages larger than the buffer size
				listener.messageRecieved(Arrays.copyOf(data, read));
			}
		} catch (IOException e) {
			System.out.println("WEBSOCKET MESSAGE RECIEVER");
			e.printStackTrace();
			listener.exceptionOccured(e);
		}
	}
}
