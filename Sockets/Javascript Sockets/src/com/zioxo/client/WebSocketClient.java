package com.zioxo.client;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import javax.xml.bind.DatatypeConverter;

import com.zioxo.OperationType;
import com.zioxo.WebSocketFrame;
import com.zioxo.listener.ClientListener;
import com.zioxo.message.BaseMessageReciever;
import com.zioxo.message.WebSocketMessageReciever;

public class WebSocketClient extends Client {

	private static final String WEBSOCKET_RESPONSE_CODE = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

	public WebSocketClient(Socket socket) throws IOException {
		super(socket);
		// TODO Auto-generated constructor stub
	}

	public WebSocketClient(Socket socket, ClientListener listener) throws IOException {
		super(socket, listener);
	}

	/**
	 * Initalize client with initalization response
	 * 
	 * @param message
	 * @throws IOException
	 */
	protected void sendResponse(String message) throws IOException {
		String[] parts = message.split("\r\n");
		String key = "";
		for (String part : parts) {
			if (part.toLowerCase().startsWith("sec-websocket-key")) {
				key = part.substring(18).trim();
				break;
			}
		}

		StringBuilder response = new StringBuilder();
		response.append("HTTP/1.1 101 Switching Protocols\r\n");
		response.append("Connection: Upgrade\r\n");
		response.append("Upgrade: websocket\r\n");
		key = key + WEBSOCKET_RESPONSE_CODE;
		byte[] sha;
		try {
			sha = MessageDigest.getInstance("SHA-1").digest(key.getBytes("UTF-8"));
			response.append("Sec-WebSocket-Accept: ");
			response.append(DatatypeConverter.printBase64Binary(sha));

		} catch (NoSuchAlgorithmException | UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		response.append("\r\n\r\n");

		System.out.println("Web Socket Connected");
		send(response.toString());
	}

	@Override
	protected BaseMessageReciever getMessageReciever() throws IOException {
		return new WebSocketMessageReciever(this, socket.getInputStream());
	}

	@Override
	public void messageRecieved(byte[] message) {
		WebSocketFrame frame = new WebSocketFrame();

		int byteIndex = parseHeader(frame, message);
		// Parse the payload data
		parsePayload(frame, Arrays.copyOfRange(message, byteIndex, message.length));
	}

	/**
	 * Controls final message and operation
	 */
	private int parseHeader(WebSocketFrame frame, byte[] b) {
		int byteIndex = 0;

		frame.setFinalFrame(getBitValue(b[byteIndex], 0, 1));
		int operationCode = getBitValue(b[byteIndex], 4, 4);
		frame.setType(OperationType.parse(operationCode));

		byteIndex++;
		frame.setMasked(getBitValue(b[byteIndex], 0, 1));

		long payloadLength = getBitValue(b[byteIndex], 1, 7);
		byteIndex++;
		int biteLength = 0;
		if (payloadLength == 126) {
			biteLength = 2;
		} else if (payloadLength == 127) {
			biteLength = 8;
		}

		if (biteLength > 0) {
			ByteBuffer buffer = ByteBuffer.wrap(b, byteIndex, biteLength);
			if (biteLength == 2) {
				payloadLength = buffer.getShort();
			} else if (biteLength == 8) {
				payloadLength = buffer.getLong();
			}
			byteIndex += byteIndex;
		}

		frame.setDataLength(payloadLength);

		if (frame.isMasked()) {
			// The masking key is only present if the frame was Masked which it should be
			frame.setMaskingKey(Arrays.copyOfRange(b, byteIndex, byteIndex + 4));
			byteIndex += 4;
		}

		return byteIndex;
	}

	private void parsePayload(WebSocketFrame frame, byte[] payload) {
		byte[] mask = frame.getMaskingKey();

		for (int x = 0; x < payload.length; x++) {
			payload[x] ^= mask[x % 4];
		}
		String data = new String(payload);
		System.out.println(data);
	}

	private byte getBitValue(byte b, int offset, int length) {
		int shift = 8 - (length + offset);
		b >>= shift;
		for (int x = 7; x > (7 - offset); x--) {
			b &= ~(1 << x);
		}

		return b;

	}
}
