package com.projet.bookface.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;

import com.mongodb.client.result.DeleteResult;
import com.projet.bookface.models.User;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserDaoTest {

	@Autowired
	private UserDao userDao;
	@Autowired
	private MongoTemplate mongoTemplate;

	@Before
	public void setUp() {
		this.mongoTemplate.remove(new Query(), User.class);
		this.createUserAndFetchById();
	}
	
	@Test
	public void createUserAndFetchById() {
		User user = mockGenerateUser();
		User added = this.userDao.createUser(user);
		assertEquals(user, added);		
		User fecthUser = this.userDao.findById(added.getId());
		assertNotNull(fecthUser);
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
	public void deleteUser() {
		User user = this.userDao.findByMail("test@test.com");
		assertNotNull(user);
		DeleteResult delete = this.userDao.deleteUser(user);
		assertEquals(1, delete.getDeletedCount());
	}
	
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
