package com.zioxo.message;

import java.io.InputStream;

import com.zioxo.listener.MessageListener;

public abstract class BaseMessageReciever implements Runnable {

	protected MessageListener listener = null;

	protected InputStream input = null;

	protected boolean oneRun = false;

	public BaseMessageReciever(MessageListener listener, InputStream input) {
		this.listener = listener;
		this.input = input;
	}

	public void setOneRun(boolean oneRun) {
		this.oneRun = oneRun;
	}
}
