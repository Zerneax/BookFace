package com.projet.bookface.rest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.projet.bookface.dao.FriendshipDao;
import com.projet.bookface.dao.UserDao;
import com.projet.bookface.exception.BackendException;
import com.projet.bookface.models.Friend;
import com.projet.bookface.models.Friendship;
import com.projet.bookface.odt.*;
import com.projet.bookface.service.FriendService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import com.projet.bookface.controller.UserController;
import com.projet.bookface.models.User;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerTest {

	private UserController controller;
	private UserDao userDao;
	private FriendshipDao friendshipDao;
	private FriendService friendService;


	@Before
	public void setUp() {

		this.userDao = Mockito.mock(UserDao.class);
		this.friendshipDao = Mockito.mock(FriendshipDao.class);
		this.friendService = Mockito.mock(FriendService.class);

		this.controller = new UserController(this.userDao, this.friendshipDao, this.friendService);

	}

	@Test
	public void login_ok() {
		Mockito.when(this.userDao.findByMail(Mockito.anyString())).thenReturn(mockGenerateUser());
		LoginOdt login = this.controller.login("any");
		assertNotNull(login);
		assertEquals("123456789", login.getId());
		assertEquals("123456", login.getPassword());
	}

	@Test
	public void login_ko() {
		Mockito.when(this.userDao.findByMail(Mockito.anyString())).thenReturn(null);
		LoginOdt login = this.controller.login("any");
		assertNotNull(login);
		assertEquals(null, login.getId());
		assertEquals(null, login.getPassword());
	}

	@Test
	public void getUser_ok() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(mockGenerateUser());
		ResponseEntity response = controller.getUser("any");
		assertEquals(HttpStatus.OK, response.getStatusCode());
		UserOdt user = (UserOdt) response.getBody();
		assertEquals(mockGenerateUser(), user.getUser());
	}

	@Test
	public void getUser_ko() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(null);
		ResponseEntity response = controller.getUser("any");
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@Test
	public void getUserLight_ok() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(mockGenerateUser());
		ResponseEntity response = controller.getUserLight("any");
		assertEquals(HttpStatus.OK, response.getStatusCode());
		UserLightOdt user = (UserLightOdt) response.getBody();
		assertEquals("test", user.getFirstName());
		assertEquals("test", user.getLastName());
	}

	@Test
	public void getUserLight_ko() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(null);
		ResponseEntity response = controller.getUserLight("any");
		assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
	}

	@Test
	public void getAllFriends_ok() throws BackendException {
		Mockito.when(this.friendshipDao.getAllFriends(Mockito.anyString())).thenReturn(mockAllFriends());
		Mockito.when(this.friendService.getDetailFriendship(Mockito.anyString())).thenReturn(mockFriend());
		ResponseEntity response = controller.getAllFriends("any");
		assertEquals(HttpStatus.OK, response.getStatusCode());
		List<Friend> liste = (List<Friend>) response.getBody();
		assertEquals(2, liste.size());
	}

	@Test
	public void getAllFriends_ok_nofriends() {
		Mockito.when(this.friendshipDao.getAllFriends(Mockito.anyString())).thenReturn(new ArrayList<Friendship>());
		ResponseEntity response = controller.getAllFriends("any");
		assertEquals(HttpStatus.OK, response.getStatusCode());
		List<Friendship> liste = (List<Friendship>) response.getBody();
		assertEquals(0, liste.size());
	}

	@Test
	public void getAllFriends_ko() throws BackendException {
		Mockito.when(this.friendshipDao.getAllFriends(Mockito.anyString())).thenReturn(mockAllFriends());
		Mockito.when(this.friendService.getDetailFriendship(Mockito.anyString())).thenThrow(new BackendException("erreur"));
		ResponseEntity response = controller.getAllFriends("any");
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
	}

	@Test
	public void checkMail_already_exist() {
		Mockito.when(this.userDao.findByMail(Mockito.anyString())).thenReturn(mockGenerateUser());
		MailAvailableOdt odt = controller.checkMailAvailable("test@test.com");
		assertNotNull(odt);
		assertEquals(false, odt.isAvailable());
	}

	@Test
	public void checkMail_available() {
		Mockito.when(this.userDao.findByMail(Mockito.anyString())).thenReturn(null);
		MailAvailableOdt odt = controller.checkMailAvailable("test@test.com");
		assertNotNull(odt);
		assertEquals(true, odt.isAvailable());
	}
	
	@Test
	public void createUser() {
		Mockito.when(this.userDao.createUser(Mockito.any(User.class))).thenReturn(mockGenerateUser());
		UserOdt odt = new UserOdt(mockGenerateUser());
		
		ResponseEntity response = controller.createUser(odt);
		assertEquals(HttpStatus.CREATED, response.getStatusCode());
		URI uri = response.getHeaders().getLocation();
		assertNotEquals("", uri);
		
		String[] splitUri = uri.toString().split("/");
		assertEquals("123456789", splitUri[splitUri.length -1]);
	}

	@Test
	public void updateUser_ok() {
		UpdateResult updateResult = UpdateResult.acknowledged(new Long("1"),new Long("1"), null);
		Mockito.when(this.userDao.updateUser(Mockito.any())).thenReturn(updateResult);
		UserOdt odt = UserOdt.builder().user(mockGenerateUser()).build();
		ResponseEntity response = controller.updateUser(odt);
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
	}

	@Test
	public void updateUser_error() {
		Mockito.when(this.userDao.updateUser(Mockito.any())).thenReturn(null);
		UserOdt odt = UserOdt.builder().user(mockGenerateUser()).build();
		ResponseEntity response = controller.updateUser(odt);
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), response.getStatusCodeValue());
	}

	@Test
	public void updateUser_noUpdate() {
		UpdateResult updateResult = UpdateResult.acknowledged(new Long("0"),new Long("0"), null);
		Mockito.when(this.userDao.updateUser(Mockito.any())).thenReturn(updateResult);
		UserOdt odt = UserOdt.builder().user(mockGenerateUser()).build();
		ResponseEntity response = controller.updateUser(odt);
		assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatusCodeValue());
	}

	@Test
	public void updateAvatar_ok() {
		UpdateResult updateResult = UpdateResult.acknowledged(new Long("1"),new Long("1"), null);
		Mockito.when(this.userDao.updateAvatar(Mockito.anyString(), Mockito.anyString())).thenReturn(updateResult);
		ResponseEntity response = controller.updateAvatar("1", AvatarOdt.builder().avatar("base64").build());
		assertEquals(HttpStatus.OK.value(), response.getStatusCodeValue());
	}

	@Test
	public void updateAvatar_error() {
		Mockito.when(this.userDao.updateAvatar(Mockito.anyString(), Mockito.anyString())).thenReturn(null);
		ResponseEntity response = controller.updateAvatar("1", new AvatarOdt());
		assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), response.getStatusCodeValue());
	}

	@Test
	public void updateAvatar_noUpdate() {
		UpdateResult updateResult = UpdateResult.acknowledged(new Long("0"),new Long("0"), null);
		Mockito.when(this.userDao.updateAvatar(Mockito.anyString(), Mockito.anyString())).thenReturn(updateResult);
		ResponseEntity response = controller.updateAvatar("1", AvatarOdt.builder().avatar("base64").build());
		assertEquals(HttpStatus.NO_CONTENT.value(), response.getStatusCodeValue());
	}

	@Test
	public void deleteUser_notExist() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(null);
		ResponseEntity response = controller.deleteUser("1");
		assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
	}

	@Test
	public void deleteUser_ok() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(mockGenerateUser());
		DeleteResult result = DeleteResult.acknowledged(new Long("1"));
		Mockito.when(this.userDao.deleteUser(Mockito.any(User.class))).thenReturn(result);
		ResponseEntity response = controller.deleteUser("1");
		assertEquals(HttpStatus.OK, response.getStatusCode());
		assertEquals(mockGenerateUser(), response.getBody());
	}

	@Test
	public void deleteUser_ko() {
		Mockito.when(this.userDao.findById(Mockito.anyString())).thenReturn(mockGenerateUser());
		DeleteResult result = DeleteResult.acknowledged(new Long("0"));
		Mockito.when(this.userDao.deleteUser(Mockito.any(User.class))).thenReturn(result);
		ResponseEntity response = controller.deleteUser("1");
		assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
	}
	
	
	//TODO: make delete method.
	
	private User mockGenerateUser() {
		return User.builder()
				.id("123456789")
				.lastName("test")
				.firstName("test")
				.birthday("10/10/1980")
				.mail("test@test.com")
				.password("123456")
				.gender("male")
				.build();
	}

	private List<Friendship> mockAllFriends() {
		List<Friendship> friends = new ArrayList<>();

		friends.add(Friendship.builder()
			.idUser1("test1")
			.idUser2("test2")
			.id("123456789")
			.build());

		friends.add(Friendship.builder()
				.idUser1("test1")
				.idUser2("test3")
				.id("987654321")
				.build());

		return friends;
	}

	private Friend mockFriend() {
		return Friend.builder()
				.firstName("friend")
				.lastName("friend")
				.idFriendship("123456789")
				.since("10/10/1980")
				.build();
	}

}
