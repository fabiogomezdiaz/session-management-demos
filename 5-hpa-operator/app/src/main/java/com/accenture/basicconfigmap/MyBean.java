package com.accenture.basicconfigmap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class MyBean {

	@Autowired
	private MyConfig myConfig;


	@Scheduled(fixedDelay = 5000)
	public void hello() {
		System.out.printf("Max Sessions: %d%n", this.myConfig.getMaxSessions());
	}

}
