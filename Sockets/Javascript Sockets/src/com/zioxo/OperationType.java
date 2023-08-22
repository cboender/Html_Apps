package com.zioxo;

public enum OperationType {
	UNKNOWN(-0x1),

	CONTINUATION(0x0),

	TEXT(0x1),

	BINARY(0x2),

	// TODO 0x3-0x7 are non control frames

	CLOSE(0x8),

	PING(0x9),

	PONG(0xA);

	// TODO 0xb-0xF are control frames

	private int code = 0;

	private OperationType(int code) {
		this.code = code;
	}

	public int getCode() {
		return code;
	}

	public static OperationType parse(int code) {
		for (OperationType type : values()) {
			if (type.getCode() == code) {
				return type;
			}
		}
		return OperationType.UNKNOWN;
	}
}
