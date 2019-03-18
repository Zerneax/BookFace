package com.projet.bookface.dao;

import java.util.List;

import com.mongodb.client.result.UpdateResult;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.mongodb.client.result.DeleteResult;
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
	
	public User findById(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		return this.mongoTemplate.findOne(query, User.class);
	}
	
	public User findByMail(String mail) {
		Query query = new Query();
		query.addCriteria(Criteria.where("mail").is(mail));
		return this.mongoTemplate.findOne(query, User.class);
	}
	
	public User createUser(User user) {
		 return this.mongoTemplate.insert(user);
	}

	public UpdateResult updateUser(User user) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(user.getId()));
		Update update = new Update();
		update.set("mail", user.getMail());
		update.set("password", user.getPassword());
		update.set("lastName", user.getLastName());
		update.set("firstName", user.getFirstName());
		return this.mongoTemplate.updateFirst(query, update, User.class);
	}

	public UpdateResult updateAvatar(String id, String avatar) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		Update update = new Update();
		update.set("avatar", avatar);
		return this.mongoTemplate.updateFirst(query, update, User.class);
	}

	public DeleteResult deleteUser(User user) {
		DeleteResult delete = this.mongoTemplate.remove(user);
		return delete;
	}
}
