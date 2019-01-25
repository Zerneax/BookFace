package com.projet.bookface.dao;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.projet.bookface.models.Friendship;
import com.projet.bookface.models.Friendship.Statut;

@Component
public class FriendshipDao {

	private MongoTemplate mongoTemplate;

	public FriendshipDao(MongoTemplate mongoTemplate) {
		super();
		this.mongoTemplate = mongoTemplate;
	}

	public Friendship getFriendship(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		
		return this.mongoTemplate.findOne(query, Friendship.class);
	}
	
	public Friendship getFriendshipByUsers(String currentUser, String people) {
		Query query = new Query();
		query.addCriteria(Criteria.where("idUser1").is(currentUser).and("idUser2").is(people));
		
		return this.mongoTemplate.findOne(query, Friendship.class);
	}
	
	public List<Friendship> getWaitingFriendship(String currentUser) {
		Query query = new Query();
		query.addCriteria(Criteria.where("idUser2").is(currentUser));
		
		return this.mongoTemplate.find(query, Friendship.class);
	}
	
	
	public Friendship askToBeFriend(Friendship friendship) {	
		friendship.setStatut(Statut.asking);
		return this.mongoTemplate.insert(friendship);
	}
	
	public void approveFriendship(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		
		Update update = new Update();
		update.set("statut", Statut.friends);
		
		this.mongoTemplate.updateFirst(query, update, Friendship.class);
	}
	
	public void breakFriendship(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		
		this.mongoTemplate.remove(query, Friendship.class);
	}
}
