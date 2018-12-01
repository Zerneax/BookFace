package com.projet.bookface.dao;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.projet.bookface.models.User;

@Component
public class UserDao {

	private MongoTemplate mongoTemplate;

	public UserDao(MongoTemplate mongoTemplate) {
		super();
		this.mongoTemplate = mongoTemplate;
	}
	
	public List<User> findAllUsers() {
		return this.mongoTemplate.findAll(User.class);
	}
	
	public User findByMail(String mail) {
		Query query = new Query();
		query.addCriteria(Criteria.where("mail").is(mail));
		return this.mongoTemplate.findOne(query, User.class);
	}
	
	public User createUser(User user) {
		 return this.mongoTemplate.insert(user);
	}
}
