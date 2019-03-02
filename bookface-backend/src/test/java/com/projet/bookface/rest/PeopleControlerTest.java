package com.projet.bookface.rest;

import com.projet.bookface.controller.PeopleController;
import com.projet.bookface.models.People;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class PeopleControlerTest {

    @Autowired
    private PeopleController peopleController;

    @Test
    public void getPeople() {
        ResponseEntity response = this.peopleController.getPeople();
        assertEquals(HttpStatus.OK, response.getStatusCode());

        List<People> peoples = (List<People>) response.getBody();
        assertEquals(0, peoples.size());
    }
}
