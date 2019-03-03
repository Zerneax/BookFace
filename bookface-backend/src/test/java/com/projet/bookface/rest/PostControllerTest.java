package com.projet.bookface.rest;

import com.projet.bookface.controller.PostController;
import com.projet.bookface.dao.PostDao;
import com.projet.bookface.models.Post;
import com.projet.bookface.odt.PostOdt;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostControllerTest {

    private PostController postController;
    private PostDao postDao;


    @Before
    public void setUp(){
       this.postDao = Mockito.mock(PostDao.class);

       this.postController = new PostController(this.postDao);
    }


    @Test
    public void createPost() {

        Mockito.when(this.postDao.createPost(Mockito.any())).thenReturn(mockPost());

        ResponseEntity response = this.postController.createPost(mockPostOdt());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        URI uri = response.getHeaders().getLocation();
        assertNotEquals("", uri);

        String[] splitUri = uri.toString().split("/");
        assertEquals("123456789", splitUri[splitUri.length -1]);
    }

    @Test
    public void getAllPosts_ok() {
        Mockito.when(this.postDao.findAllPostByAuthor(Mockito.anyString())).thenReturn(mockPosts());
        ResponseEntity response = this.postController.getAllPost("test");
        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<PostOdt> posts = (List<PostOdt>) response.getBody();
        assertEquals(2, posts.size());
    }

    @Test
    public void getAllPosts_notfound() {
        Mockito.when(this.postDao.findAllPostByAuthor(Mockito.anyString())).thenReturn(null);
        ResponseEntity response = this.postController.getAllPost("test");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void getPost_ok() {
        Mockito.when(this.postDao.findPost(Mockito.anyString())).thenReturn(mockPost());
        ResponseEntity response = this.postController.getPost("any");
        assertEquals(HttpStatus.OK, response.getStatusCode());

        PostOdt postOdt = (PostOdt) response.getBody();
        assertNotNull(postOdt);
        assertEquals(mockPost(), postOdt.getPost());
    }

    @Test
    public void getPost_nofound() {
        Mockito.when(this.postDao.findPost(Mockito.anyString())).thenReturn(null);
        ResponseEntity response = this.postController.getPost("any");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }


    @Test
    public void stage4_updateLike() {
        Mockito.when(this.postDao.findPost(Mockito.anyString())).thenReturn(mockPost());
        ResponseEntity response = this.postController.updateLike("any", "me");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void deletePost() {
        ResponseEntity response = this.postController.deletePost("any");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }



    protected Post mockPost() {
        return Post.builder()
                .id("123456789")
                .author("test")
                .content("content")
                .like(new ArrayList<>())
                .build();
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

    protected List<Post> mockPosts() {
        List<Post> liste = new ArrayList<>();

        liste.add(Post.builder()
                .id("123456789")
                .author("test")
                .content("content")
                .like(new ArrayList<>())
                .build());

        liste.add(Post.builder()
                .id("987654321")
                .author("test")
                .content("content")
                .like(new ArrayList<>())
                .build());

        return liste;
    }
}
