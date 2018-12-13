package com.projet.bookface.dao;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;

import com.projet.bookface.models.Post;

@Component
public class PostDao {

	private MongoTemplate mongoTemplate;

	public PostDao(MongoTemplate mongoTemplate) {
		super();
		this.mongoTemplate = mongoTemplate;
	}
	
	public Post createPost(Post post) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/YYYY");
		Calendar calendar = Calendar.getInstance();
		Date dateOfThePost = calendar.getTime();
		post.setDate(dateFormat.format(dateOfThePost));
		return this.mongoTemplate.insert(post);
	}
	
	public Post findPost(String id) {
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(id));
		return this.mongoTemplate.findOne(query, Post.class);
	}
	
	public List<Post> findAllPostByAuthor(String author) {
		Query query = new Query();
		query.addCriteria(Criteria.where("author").is(author));
		return this.mongoTemplate.find(query, Post.class);
	}
	
	public void updatePost(Post post) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where("id").is(post.getId()));
		
		Update update = new Update();
		update.set("like", post.getLike());
		
		this.mongoTemplate.updateFirst(query, update, Post.class);
	}
}
