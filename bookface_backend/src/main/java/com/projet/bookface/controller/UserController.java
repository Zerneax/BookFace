package com.projet.bookface.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projet.bookface.dao.UserDao;
import com.projet.bookface.models.User;

@RestController
@RequestMapping(value="/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

	private UserDao userDao;

	public UserController(UserDao userDao) {
		super();
		this.userDao = userDao;
	}
	
	@GetMapping(value="/all")
	public List<User> findUsers() {
		return this.userDao.findAllUsers();
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public User findUserByMail(@RequestParam("mail") String mail) {
		return this.userDao.findByMail(mail);
	}
	
	@PostMapping
	public ResponseEntity createUser(@RequestBody User user) {
		
		User userAdded = this.userDao.createUser(user);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(userAdded.getId())
				.toUri();
		
		return ResponseEntity.created(location).build();
	}
}
