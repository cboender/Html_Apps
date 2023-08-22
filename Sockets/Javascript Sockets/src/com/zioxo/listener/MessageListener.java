package com.zioxo.listener;

public interface MessageListener {

	public void messageRecieved(byte[] message);

	public void exceptionOccured(Throwable t);
}
