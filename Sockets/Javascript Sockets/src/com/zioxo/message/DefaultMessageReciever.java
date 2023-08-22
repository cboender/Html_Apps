package com.zioxo.message;

import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.Scanner;

import com.zioxo.listener.MessageListener;

public class DefaultMessageReciever extends BaseMessageReciever {

	public DefaultMessageReciever(MessageListener listener, InputStream input) {
		super(listener, input);
	}

	@Override
	public void run() {

		Scanner scanner = null;
		try {
			scanner = new Scanner(input);
			scanner.useDelimiter("\r\n\r\n");
			do {
				String text = scanner.next();
				listener.messageRecieved(text.getBytes("UTF-8"));
			} while (!oneRun);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (Exception exp) {
			exp.printStackTrace();
		} finally {
			if (!oneRun)
				scanner.close();
		}
	}
}
