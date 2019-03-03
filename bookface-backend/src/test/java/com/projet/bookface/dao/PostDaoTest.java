package com.projet.bookface.dao;

import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import com.projet.bookface.models.Post;
import javafx.geometry.Pos;
import org.bson.BsonString;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.SimpleDateFormat;
import java.util.*;

@RunWith(MockitoJUnitRunner.class)
@SpringBootTest
public class PostDaoTest {

    private PostDao postDao;


    @Before
    public void setUp() {
        MongoTemplate mongoTemplate = Mockito.mock(MongoTemplate.class);

        this.postDao = new PostDao(mongoTemplate);

        Mockito.when(mongoTemplate.insert(Matchers.any(Post.class))).thenReturn(mockPost());

        Mockito.when(mongoTemplate.findOne(Matchers.any(Query.class), Matchers.any())).thenReturn(mockPost());

        List<Object> liste = new ArrayList<>();
        liste.add(new Post());
        Mockito.when(mongoTemplate.find(Matchers.any(Query.class), Matchers.any())).thenReturn(liste);

    }

    @Test
    public void createPost() {
        Post postAdded = this.postDao.createPost(mockPost());

        Assert.assertNotNull(postAdded);
        Assert.assertEquals("123456789", postAdded.getId());
        Assert.assertEquals("test", postAdded.getAuthor());
        Assert.assertEquals("content", postAdded.getContent());

        Assert.assertEquals(getDate(), postAdded.getDate());
        Assert.assertEquals(0, postAdded.getLike().size());

    }

    @Test
    public void findPost() {
       Post post = this.postDao.findPost("any");
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
        Post post = this.postDao.findPost("any");
        post.setLike(Arrays.asList("user"));
        this.postDao.updatePost(post);
    }

    @Test
    public void deletePost() {
        this.postDao.deletePost("any");
    }

    protected Post mockPost() {
        return Post.builder()
                .id("123456789")
                .author("test")
                .content("content")
                .date(getDate())
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

