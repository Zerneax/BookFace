package com.projet.bookface.rest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.net.URI;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.projet.bookface.controller.UserController;
import com.projet.bookface.models.User;
import com.projet.bookface.odt.MailAvailableOdt;
import com.projet.bookface.odt.UserOdt;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

	@Autowired
	private UserController controller;
	
	@Test
	public void createUser() {
		UserOdt odt = new UserOdt(mockGenerateUser());
		
		ResponseEntity response = controller.createUser(odt);
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		URI uri = response.getHeaders().getLocation();
		assertNotEquals("", uri);
		
		String[] splitUri = uri.toString().split("/");
		String id = splitUri[splitUri.length -1];
		
		ResponseEntity responseGet = controller.getUser(id);
		assertEquals(HttpStatus.OK, responseGet.getStatusCode());
		UserOdt userOdtFetch = (UserOdt) responseGet.getBody();
		assertEquals(odt, userOdtFetch);
	}
	
	@Test
	public void checkMail_already_exist() {
		MailAvailableOdt odt = controller.checkMailAvailable("test@test.com");
		assertNotNull(odt);
		assertEquals(false, odt.isAvailable());
	}
	
	@Test
	public void checkMail_not_exist() {
		MailAvailableOdt odt = controller.checkMailAvailable("test1@test.com");
		assertNotNull(odt);
		assertEquals(true, odt.isAvailable());
	}
	
	//TODO: make delete method.
	
	private User mockGenerateUser() {
		return User.builder()
				.lastName("test")
				.firstName("test")
				.birthday("10/10/1980")
				.mail("test@test.com")
				.password("123456")
				.gender("male")
				.build();
	}
}
