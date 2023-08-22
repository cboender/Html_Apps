package com.zioxo;

public class WebSocketFrame {

	private boolean finalFrame = false;

	private OperationType type = null;

	private boolean masked = false;

	private long dataLength = 0;

	private String data = null;

	private byte[] maskingKey = null;

	public WebSocketFrame() {
		// TODO Auto-generated constructor stub
	}

	public boolean isFinalFrame() {
		return finalFrame;
	}

	public void setFinalFrame(int finalFrame) {
		this.finalFrame = getBoolean(finalFrame);
	}

	public OperationType getType() {
		return type;
	}

	public void setType(OperationType type) {
		this.type = type;
	}

	public boolean isMasked() {
		return masked;
	}

	public void setMasked(int masked) {
		this.masked = getBoolean(masked);
	}

	public long getDataLength() {
		return dataLength;
	}

	public void setDataLength(long dataLength) {
		this.dataLength = dataLength;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	private boolean getBoolean(int value) {
		if (value == 0) {
			return false;
		} else {
			return true;
		}
	}

	public byte[] getMaskingKey() {
		return maskingKey;
	}

	public void setMaskingKey(byte[] maskingKey) {
		this.maskingKey = maskingKey;
	}
}
