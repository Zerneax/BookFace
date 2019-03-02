package com.projet.bookface.dao;

import com.projet.bookface.models.Post;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.SimpleDateFormat;
import java.util.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PostDaoTest {

    @Autowired
    private PostDao postDao;
    @Autowired
    private MongoTemplate mongoTemplate;

    private String idPostTest;

    @Before
    public void setUp() {
        this.mongoTemplate.remove(new Query(), Post.class);
        this.createPost();
    }

    @Test
    public void createPost() {
        Post postAdded = this.postDao.createPost(mockPost());

        Assert.assertNotNull(postAdded);
        this.idPostTest = postAdded.getId();

        Assert.assertEquals("test", postAdded.getAuthor());
        Assert.assertEquals("content", postAdded.getContent());

        Assert.assertEquals(getDate(), postAdded.getDate());
        Assert.assertEquals(0, postAdded.getLike().size());

    }

    @Test
    public void findPost() {
       Post post = this.postDao.findPost(this.idPostTest);
       Assert.assertNotNull(post);

       Post mock = mockPost();
       Assert.assertEquals(mock.getAuthor(), post.getAuthor());
       Assert.assertEquals(mock.getContent(), post.getContent());
    }

    @Test
    public void findAllPostFromAuthor() {
        List<Post> posts = this.postDao.findAllPostByAuthor("test");
        Assert.assertNotNull(posts);
        Assert.assertEquals(1, posts.size());
    }

    @Test
    public void updatePost() {
        Post post = this.postDao.findPost(this.idPostTest);
        post.setLike(Arrays.asList("user"));
        this.postDao.updatePost(post);

        Post postAfter = this.postDao.findPost(this.idPostTest);
        Assert.assertNotNull(postAfter);
        Assert.assertEquals(1, postAfter.getLike().size());
    }

    @Test
    public void deletePost() {
        this.postDao.deletePost(this.idPostTest);
        Post postAfter = this.postDao.findPost(this.idPostTest);
        Assert.assertNull(postAfter);
    }

    protected Post mockPost() {
        return Post.builder()
                .author("test")
                .content("content")
                .like(new ArrayList<>())
                .build();
    }

    protected String getDate() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/YYYY");
        Calendar calendar = Calendar.getInstance();
        Date dateOfThePost = calendar.getTime();

        return dateFormat.format(dateOfThePost);
    }
}

