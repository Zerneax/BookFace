package com.projet.bookface.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projet.bookface.dao.PostDao;
import com.projet.bookface.models.Post;
import com.projet.bookface.odt.PostOdt;

@RestController
@RequestMapping(value="/posts")
@CrossOrigin(origins = {"http://192.168.0.18:4200", "http://localhost:4200"})
public class PostController {

	private PostDao postDao;

	public PostController(PostDao postDao) {
		super();
		this.postDao = postDao;
	}
	
	@PostMapping
	public ResponseEntity createPost(@RequestBody PostOdt postOdt) {
		
		Post postAdded = this.postDao.createPost(postOdt.getPost());
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{id}")
				.buildAndExpand(postAdded.getId())
				.toUri();
		
		// add this header to expose Location because CORS that return only couple of simple headers
		HttpHeaders headers = new HttpHeaders();
		headers.add("Access-Control-Expose-Headers", "Location");
		return ResponseEntity.created(location).headers(headers).build();
	}
	
	@GetMapping(value="/{author}")
	public ResponseEntity getPost(@PathVariable String author) {
		List<Post> post = this.postDao.findAllPostByAuthor(author);
		
		if(post == null) {
			return ResponseEntity.notFound().build();
		}
		
		List<PostOdt> posts = new ArrayList();
		for(Post p : post) {
			PostOdt postOdt = PostOdt.builder().post(p).build();
			posts.add(postOdt);
		}
		
		
		return ResponseEntity.ok(posts);		
	}
	
	@PutMapping(value="/{idPost}")
	public ResponseEntity updateLike(@PathVariable String idPost) {
		
		Post post = this.postDao.findPost(idPost);	
		post.setLike(post.getLike() + 1);
		
		this.postDao.updatePost(post);
		
		return ResponseEntity.ok(post);
	}
	
	@DeleteMapping(value="/{idPost}")
	public ResponseEntity deletePost(@PathVariable String idPost) {
		
		this.postDao.deletePost(idPost);	
		
		return ResponseEntity.ok(null);
	}
}
