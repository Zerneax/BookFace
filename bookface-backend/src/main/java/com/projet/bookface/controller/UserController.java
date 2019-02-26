package com.projet.bookface.controller;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.projet.bookface.exception.BackendException;
import com.projet.bookface.models.Friend;
import com.projet.bookface.service.FriendService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

import javax.xml.ws.Response;

@RestController
@RequestMapping(value="/users")
@CrossOrigin(origins = {"http://192.168.0.18:4200", "http://localhost:4200"})
public class UserController {

	private UserDao userDao;
	private FriendshipDao friendshipDao;
	private FriendService friendService;

	public UserController(UserDao userDao, FriendshipDao friendshipDao, FriendService friendService) {
		super();
		this.userDao = userDao;
		this.friendshipDao = friendshipDao;
		this.friendService = friendService;
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
		List<Friendship> friendship = this.friendshipDao.getAllFriends(id);

		List<Friend> friends = new ArrayList<>();
		for(Friendship f: friendship) {
			try {
				Friend friend = this.friendService.getDetailFriendship(id.equals(f.getIdUser1()) ? f.getIdUser2() : f.getIdUser1());
				friend.setSince(f.getDate());
				friend.setIdFriendship(f.getId());
				friends.add(friend);
			} catch (BackendException e) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
			}
		}
		
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
