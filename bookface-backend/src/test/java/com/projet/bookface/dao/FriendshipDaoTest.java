package com.projet.bookface.dao;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;

import com.projet.bookface.models.Friendship;
import com.projet.bookface.models.Friendship.Statut;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FriendshipDaoTest {

	@Autowired
	private FriendshipDao friendshipDao;
	@Autowired
	private MongoTemplate mongoTemplate;

	private String idFriendship;

	@Before
	public void setUp() {
		this.mongoTemplate.remove(new Query(), Friendship.class);
		this.stage1_askToBeFriends();
	}

	@Test
	public void stage1_askToBeFriends() {
		Friendship friendshipCreated = this.friendshipDao.askToBeFriend(mockFriendship());
		assertEquals(Statut.asking, friendshipCreated.getStatut());
		this.idFriendship = friendshipCreated.getId();
	}

	@Test
	public void stage2_getFriendship() {
		Friendship friendship = this.friendshipDao.getFriendship(this.idFriendship);
		assertNotNull(friendship);
	}

	@Test
	public void stage3_getFriendshipByUsers() {
		Friendship friendship = this.friendshipDao.getFriendshipByUsers("123456", "45789");
		assertNotNull(friendship);
	}

	@Test
	public void stage4_getWaitingFriendship() {
		List<Friendship> friendships = this.friendshipDao.getWaitingFriendship("45789");
		assertNotNull(friendships);
		assertTrue(friendships.size() == 1);
	}

	@Test
	public void stage5_approveFriendship() {
		this.friendshipDao.approveFriendship(this.idFriendship);
		Friendship friendship = this.friendshipDao.getFriendship(this.idFriendship);
		assertNotNull(friendship);
		assertEquals(Statut.friends, friendship.getStatut());

	}

	@Test
	public void stage6_breakFriendship() {
		this.friendshipDao.breakFriendship(this.idFriendship);

		Friendship getFriendshipAfterRemove = this.friendshipDao.getFriendship(this.idFriendship);
		assertEquals(null, getFriendshipAfterRemove);
	}
	
	/*@Test
	public void processFriendship() {
		Friendship friendshipCreated = this.friendshipDao.askToBeFriend(mockFriendship());
		assertEquals(Statut.asking, friendshipCreated.getStatut());
		
		this.friendshipDao.approveFriendship(friendshipCreated.getId());
		
		Friendship getFriendship = this.friendshipDao.getFriendship(friendshipCreated.getId());
		assertEquals(Statut.friends, getFriendship.getStatut());
		
		this.friendshipDao.breakFriendship(friendshipCreated.getId());
		
		Friendship getFriendshipAfterRemove = this.friendshipDao.getFriendship(friendshipCreated.getId());
		assertEquals(null, getFriendshipAfterRemove);
	}*/
	
	private Friendship mockFriendship() {
		return Friendship.builder()
				.idUser1("123456")
				.idUser2("45789")
				.build();
	}
}
