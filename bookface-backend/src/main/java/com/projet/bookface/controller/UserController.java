package com.projet.bookface.controller;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mongodb.client.result.DeleteResult;
import com.projet.bookface.dao.FriendshipDao;
import com.projet.bookface.dao.UserDao;
import com.projet.bookface.models.Friendship;
import com.projet.bookface.models.User;
import com.projet.bookface.odt.LoginOdt;
import com.projet.bookface.odt.MailAvailableOdt;
import com.projet.bookface.odt.UserLightOdt;
import com.projet.bookface.odt.UserOdt;

@RestController
@RequestMapping(value="/users")
@CrossOrigin(origins = {"http://192.168.0.18:4200", "http://localhost:4200"})
public class UserController {

	private UserDao userDao;
	private FriendshipDao friendshipDao;

	public UserController(UserDao userDao, FriendshipDao friendshipDao) {
		super();
		this.userDao = userDao;
		this.friendshipDao = friendshipDao;
	}
	
	@GetMapping(value="/{mail}/login")
	public LoginOdt login(@PathVariable String mail) {
		User user = this.userDao.findByMail(mail);
		
		LoginOdt odt = new LoginOdt();
		
		if(user != null) {
			odt.setId(user.getId());
			odt.setPassword(user.getPassword());
		}else { 
			odt.setId(null);
			odt.setPassword(null);
		}
		
		return odt;			
	}
	
	@GetMapping(value="/{id}")
	public ResponseEntity getUser(@PathVariable String id) {
		User user = this.userDao.findById(id);
		
		if(user == null) {
			return ResponseEntity.notFound().build();
		}
		UserOdt userOdt = UserOdt.builder().user(user).build();
		
		return ResponseEntity.ok(userOdt);		
	}
	
	@GetMapping(value="/{id}/light")
	public ResponseEntity getUserLight(@PathVariable String id) {
		User user = this.userDao.findById(id);
		
		if(user == null) {
			return ResponseEntity.notFound().build();
		}
		
		UserLightOdt odt = UserLightOdt.builder()
				.lastName(user.getLastName())
				.firstName(user.getFirstName())
				.build();
		
		return ResponseEntity.ok(odt);		
	}
	
	@GetMapping(value="/{id}/friends")
	public ResponseEntity getAllFriends(@PathVariable String id) {
		List<Friendship> friends = this.friendshipDao.getAllFriends(id);
		
		return ResponseEntity.ok(friends);
	}
	
	@RequestMapping(method=RequestMethod.GET)
	public MailAvailableOdt checkMailAvailable(@RequestParam("mail") String mail) {
		User user = this.userDao.findByMail(mail);
		
		MailAvailableOdt odt = new MailAvailableOdt();
		
		if(user == null)
			odt.setAvailable(true);
		else 
			odt.setAvailable(false);
		
		return odt;			
	}
	
	@PostMapping
	public ResponseEntity createUser(@RequestBody UserOdt userOdt) {
		
		User user = userOdt.getUser();
		
		SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
		Calendar cal = Calendar.getInstance();
		Date date = cal.getTime();
		user.setDateRegister(format.format(date));
		
		User userAdded = this.userDao.createUser(user);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(userAdded.getId())
				.toUri();
		
		// add this header to expose Location because CORS that return only couple of simple headers
		HttpHeaders headers = new HttpHeaders();
		headers.add("Access-Control-Expose-Headers", "Location");
		return ResponseEntity.created(location).headers(headers).build();
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity deleteUser(@PathVariable String id) {
		User user = this.userDao.findById(id);
		
		if(user == null)
			return ResponseEntity.noContent().build();	
		
		DeleteResult result = this.userDao.deleteUser(user);
		
		if(result.getDeletedCount() > 0) {
			return ResponseEntity.ok(user);	
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();	
		}
		
	}
}