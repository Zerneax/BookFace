package com.projet.bookface.rest;

import com.projet.bookface.controller.PeopleController;
import com.projet.bookface.dao.UserDao;
import com.projet.bookface.models.People;
import com.projet.bookface.models.User;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PeopleControllerTest {

    private PeopleController peopleController;
    private UserDao userDao;

    @Before
    public void setUp() {
        this.userDao = Mockito.mock(UserDao.class);

        this.peopleController = new PeopleController(this.userDao);
    }

    @Test
    public void getPeople_ok() {
        Mockito.when(this.userDao.findAllUsers()).thenReturn(mockUsers());
        ResponseEntity response = this.peopleController.getPeople();
        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<People> peoples = (List<People>) response.getBody();
        assertEquals(2, peoples.size());
    }

    @Test
    public void getPeople_notfound() {
        Mockito.when(this.userDao.findAllUsers()).thenReturn(null);
        ResponseEntity response = this.peopleController.getPeople();
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }


    protected List<User> mockUsers() {
        List<User> liste = new ArrayList<>();

        liste.add(User.builder()
                .id("123456789")
                .lastName("test")
                .firstName("test")
                .birthday("10/10/1980")
                .mail("test@test.com")
                .password("123456")
                .gender("male")
                .build());

        liste.add(User.builder()
                .id("987654321")
                .lastName("test2")
                .firstName("test2")
                .birthday("10/10/1980")
                .mail("test2@test2.com")
                .password("123456")
                .gender("male")
                .build());

        return liste;
    }
}
