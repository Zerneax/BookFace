package com.projet.bookface.dao;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.projet.bookface.models.Friendship;
import com.projet.bookface.models.Friendship.Statut;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FriendshipDaoTest {

	@Autowired
	private FriendshipDao friendshipDao;
	
	@Test
	public void processFriendship() {
		Friendship friendshipCreated = this.friendshipDao.askToBeFriend(mockFriendship());
		assertEquals(Statut.asking, friendshipCreated.getStatut());
		
		this.friendshipDao.approveFriendship(friendshipCreated.getId());
		
		Friendship getFriendship = this.friendshipDao.getFriendship(friendshipCreated.getId());
		assertEquals(Statut.friends, getFriendship.getStatut());
		
		this.friendshipDao.breakFriendship(friendshipCreated.getId());
		
		Friendship getFriendshipAfterRemove = this.friendshipDao.getFriendship(friendshipCreated.getId());
		assertEquals(null, getFriendshipAfterRemove);
	}
	
	private Friendship mockFriendship() {
		return Friendship.builder()
				.idUser1("123456")
				.idUser2("45789")
				.build();
	}
}
