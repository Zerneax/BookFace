package com.projet.bookface.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.projet.bookface.models.Message;

@Controller
public class WEbSocketController {

	private final SimpMessagingTemplate template;
	
	
	
	public WEbSocketController(SimpMessagingTemplate template) {
		super();
		this.template = template;
	}


	@MessageMapping("/send/message")
	public void onReceiveMessage(Message msg) {
		this.template.convertAndSend("/chat", "Bien recu le message : " + msg.getMessage());
	}
}
