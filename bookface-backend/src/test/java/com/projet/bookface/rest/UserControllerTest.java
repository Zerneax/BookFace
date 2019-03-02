package com.projet.bookface.rest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.net.URI;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
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
	@Autowired
	private MongoTemplate mongoTemplate;
	
	private String idCreated;

	@Before
	public void setUp() {
		this.mongoTemplate.remove(new Query(),User.class);
	}

	@Test
	public void checkMail_already_exist() {
		MailAvailableOdt odt = controller.checkMailAvailable("test@test.com");
		assertNotNull(odt);
		assertEquals(true, odt.isAvailable());
	}
	
	@Test
	public void createUser() {
		UserOdt odt = new UserOdt(mockGenerateUser());
		
		ResponseEntity response = controller.createUser(odt);
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		URI uri = response.getHeaders().getLocation();
		assertNotEquals("", uri);
		
		String[] splitUri = uri.toString().split("/");
		idCreated = splitUri[splitUri.length -1];
		
		ResponseEntity responseGet = controller.getUser(idCreated);
		assertEquals(HttpStatus.OK, responseGet.getStatusCode());
		UserOdt userOdtFetch = (UserOdt) responseGet.getBody();
		assertEquals(odt, userOdtFetch);
		
		ResponseEntity responseDelete = controller.deleteUser(idCreated);
		assertEquals(HttpStatus.OK, responseDelete.getStatusCode());
	}
	
	@Test
	public void checkMail_not_exist() {
		MailAvailableOdt odt = controller.checkMailAvailable("test1@test.com");
		assertNotNull(odt);
		assertEquals(true, odt.isAvailable());
	}
	
	@Test
	public void deleteUser_notExist() {
		ResponseEntity response = controller.deleteUser("1");
		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
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
