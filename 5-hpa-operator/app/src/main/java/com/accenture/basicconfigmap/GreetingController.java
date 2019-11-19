package com.accenture.basicconfigmap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

	@Autowired
	private MyConfig myConfig;

    @RequestMapping("/hello")
    public String hello() {
        String sessions = "Max Sessions: " + this.myConfig.getMaxSessions();
        System.out.println(sessions);
        return sessions;
    }
}