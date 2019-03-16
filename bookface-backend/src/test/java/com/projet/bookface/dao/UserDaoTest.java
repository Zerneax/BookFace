package com.projet.bookface.dao;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.projet.bookface.models.User;
import org.assertj.core.util.Arrays;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class UserDaoTest {

	private UserDao userDao;

	@Before
	public void setUp() {


		MongoTemplate mongoTemplate = Mockito.mock(MongoTemplate.class);

		this.userDao = new UserDao(mongoTemplate);
		Mockito.when(mongoTemplate.insert(Matchers.any(User.class))).thenReturn(mockGenerateUser());

		Mockito.when(mongoTemplate.findOne(Matchers.any(Query.class), Matchers.any())).thenReturn(mockGenerateUser());

		List<Object> liste = new ArrayList<>();
		liste.add(new User());
		Mockito.when(mongoTemplate.findAll(Matchers.any())).thenReturn(liste);

		UpdateResult updateResult = UpdateResult.acknowledged(new Long("1"),new Long("1"), null);
		Mockito.when(mongoTemplate.updateFirst(Matchers.any(), Matchers.any(), Matchers.<Class<User>>any())).thenReturn(updateResult);
		//Mockito.when(mongoTemplate.updateFirst(Matchers.any(), Matchers.any(), Matchers.any(User.class))).thenReturn(updateResult);

		DeleteResult result = DeleteResult.acknowledged(new Long("1"));
		Mockito.when(mongoTemplate.remove(Matchers.any(User.class))).thenReturn(result);
	}
	
	@Test
	public void createUser() {
		User user = mockGenerateUser();
		User added = this.userDao.createUser(user);
		assertEquals(user, added);		

	}

	@Test
	public void findById() {
		User fecthUser = this.userDao.findById("any");
		assertEquals(mockGenerateUser(), fecthUser);
	}
	
	@Test
	public void getUserByMail() {
		User user = this.userDao.findByMail("test@test.com");
		assertNotNull(user);
	}
	
	@Test
	public void getAllUsers() {
		List<User> users = this.userDao.findAllUsers();
		assertTrue(users.size() == 1);
	}

	@Test
	public void updateUser() {
		UpdateResult result = this.userDao.updateUser(new User());
		assertEquals(1, result.getModifiedCount());
		assertEquals(1, result.getMatchedCount());
	}
	
	@Test
	public void deleteUser() {
		DeleteResult delete = this.userDao.deleteUser(new User());
		assertEquals(1, delete.getDeletedCount());
	}
	
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
}
