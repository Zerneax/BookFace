package com.projet.bookface.controller;

import java.net.URI;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projet.bookface.dao.FriendshipDao;
import com.projet.bookface.models.Friendship;
import com.projet.bookface.odt.AskingFriendShipOdt;
import com.projet.bookface.odt.FriendshipOdt;

@RestController
@RequestMapping(value="/friendship")
@CrossOrigin(origins = {"http://192.168.0.18:4200", "http://localhost:4200"})
public class FriendshipController {

	private FriendshipDao friendshipDao;

	public FriendshipController(FriendshipDao friendshipDao) {
		super();
		this.friendshipDao = friendshipDao;
	}
	
	
	@RequestMapping(method=RequestMethod.GET)
	public ResponseEntity getFriendsShip(@RequestParam("currentUser") String currentUser, @RequestParam("people") String people) {
		Friendship friendship = this.friendshipDao.getFriendshipByUsers(currentUser, people);
		
		if(friendship == null) {
			return ResponseEntity.notFound().build();
		}
		
		FriendshipOdt friendshipOdt = FriendshipOdt.builder().friendship(friendship).build();
		return ResponseEntity.ok(friendshipOdt);		
	}
	
	
	@GetMapping(value="/waiting/{currentUser}")
	public ResponseEntity getWaitingInvitations(@PathVariable String currentUser) {
		List<Friendship> waitingFriendship = this.friendshipDao.getWaitingFriendship(currentUser);
		
		return ResponseEntity.ok(waitingFriendship);
	}
	
	
	@PostMapping
	public ResponseEntity createFriendship(@RequestBody AskingFriendShipOdt friendShipOdt) {
		
		Friendship friendship = Friendship.builder()
				.idUser1(friendShipOdt.getCurrentUser())
				.idUser2(friendShipOdt.getPeople())
				.build();
		Friendship friendShipAdded = this.friendshipDao.askToBeFriend(friendship);
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(friendShipAdded.getId())
				.toUri();
		
		// add this header to expose Location because CORS that return only couple of simple headers
		HttpHeaders headers = new HttpHeaders();
		headers.add("Access-Control-Expose-Headers", "Location");
		return ResponseEntity.created(location).headers(headers).build();
	}
	
	@PutMapping(value="/{id}")
	public ResponseEntity acceptFriendship(@PathVariable String id) {
		this.friendshipDao.approveFriendship(id);
		
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping(value="/{id}")
	public ResponseEntity refuseFriendship(@PathVariable String id) {
		this.friendshipDao.breakFriendship(id);
		
		return ResponseEntity.ok().build();
	}
}
