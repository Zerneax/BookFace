package com.projet.bookface.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projet.bookface.dao.UserDao;
import com.projet.bookface.models.User;

@RestController
@RequestMapping(value="/people")
@CrossOrigin(origins = {"http://192.168.0.18:4200", "http://localhost:4200"})
public class PeopleController {

	private UserDao userDao;
	
	public PeopleController(UserDao userDao) {
		super();
		this.userDao = userDao;
	}


	@GetMapping
	public ResponseEntity getPost() {
		List<User> users = this.userDao.findAllUsers();
		
		if(users == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(users);		
	}
}
