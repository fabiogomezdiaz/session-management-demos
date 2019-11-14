package com.accenture.basicconfigmap;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "sessions")
public class MyConfig {

	private int maxSessions = 10;

	public int getMaxSessions() {
		return this.maxSessions;
	}

	public void setMaxSessions(int maxSessions) {
		this.maxSessions = maxSessions;
	}

}
