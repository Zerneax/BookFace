package com.projet.bookface.rest;

import com.projet.bookface.controller.PostController;
import com.projet.bookface.models.Post;
import com.projet.bookface.odt.PostOdt;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PostControllerTest {

    @Autowired
    private PostController postController;
    @Autowired
    private MongoTemplate mongoTemplate;

    private String idPost;


    @Before
    public void setUp(){
        this.mongoTemplate.remove(new Query(), Post.class);
        this.stage1_createPost();
    }


    @Test
    public void stage1_createPost() {
        PostOdt postOdt = mockPostOdt();

        ResponseEntity response = this.postController.createPost(postOdt);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        URI uri = response.getHeaders().getLocation();
        assertNotEquals("", uri);

        String[] splitUri = uri.toString().split("/");
        this.idPost = splitUri[splitUri.length -1];
    }

    @Test
    public void stage2_getPost() {
        ResponseEntity response = this.postController.getPost(this.idPost);
        assertEquals(HttpStatus.OK, response.getStatusCode());

        PostOdt postOdt = (PostOdt) response.getBody();
        assertNotNull(postOdt);
    }

    @Test
    public void stage3_getAllPosts() {
        ResponseEntity response = this.postController.getAllPost("test");
        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<PostOdt> posts = (List<PostOdt>) response.getBody();
        assertNotNull(posts);
    }

    @Test
    public void stage4_updateLike() {
        ResponseEntity response = this.postController.updateLike(this.idPost, "me");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void stage5_deletePost() {
        ResponseEntity response = this.postController.deletePost(this.idPost);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getPost_notFound() {
        ResponseEntity response = this.postController.getPost("");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

    }

    protected PostOdt mockPostOdt() {

        Post post = Post.builder()
                .author("test")
                .content("content")
                .like(new ArrayList<>())
                .build();

        return PostOdt.builder()
                .post(post)
                .build();

    }
}
