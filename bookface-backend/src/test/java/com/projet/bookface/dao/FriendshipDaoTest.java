package com.projet.bookface.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import com.mongodb.client.result.DeleteResult;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;

import com.projet.bookface.models.Friendship;
import com.projet.bookface.models.Friendship.Statut;

import java.util.ArrayList;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class FriendshipDaoTest {

	private FriendshipDao friendshipDao;


	@Before
	public void setUp() {
		MongoTemplate mongoTemplate = Mockito.mock(MongoTemplate.class);

		this.friendshipDao = new FriendshipDao(mongoTemplate);

		Friendship friendship = mockFriendship();
		friendship.setStatut(Statut.asking);

		Mockito.when(mongoTemplate.insert(Matchers.any(Friendship.class))).thenReturn(friendship);

		Mockito.when(mongoTemplate.findOne(Matchers.any(Query.class), Matchers.any())).thenReturn(friendship);

		List<Object> liste = new ArrayList<>();
		liste.add(new Friendship());
		Mockito.when(mongoTemplate.find(Matchers.any(Query.class), Matchers.any())).thenReturn(liste);

	}

	@Test
	public void askToBeFriends() {
		Friendship friendshipCreated = this.friendshipDao.askToBeFriend(mockFriendship());
		assertEquals(Statut.asking, friendshipCreated.getStatut());
	}

	@Test
	public void getFriendship() {
		Friendship friendship = this.friendshipDao.getFriendship("any");
		assertNotNull(friendship);
	}

	@Test
	public void getFriendshipByUsers() {
		Friendship friendship = this.friendshipDao.getFriendshipByUsers("123456", "45789");
		assertNotNull(friendship);
	}

	@Test
	public void getWaitingFriendship() {
		List<Friendship> friendships = this.friendshipDao.getWaitingFriendship("45789");
		assertNotNull(friendships);
		assertTrue(friendships.size() == 1);
	}

	@Test
	public void approveFriendship() {
		this.friendshipDao.approveFriendship("any");
		Friendship friendship = this.friendshipDao.getFriendship("any");
	}

	@Test
	public void breakFriendship() {
		this.friendshipDao.breakFriendship("any");
	}


	private Friendship mockFriendship() {
		return Friendship.builder()
				.idUser1("123456")
				.idUser2("45789")
				.build();
	}
}
