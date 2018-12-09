package com.projet.bookface.dao;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
}