package com.projet.bookface.rest;

import com.projet.bookface.controller.FriendshipController;
import com.projet.bookface.models.Friendship;
import com.projet.bookface.odt.AskingFriendShipOdt;
import com.projet.bookface.odt.FriendshipOdt;
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
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class FriendshipControllerTest {

    @Autowired
    private FriendshipController friendshipController;
    @Autowired
    private MongoTemplate mongoTemplate;

    private String idFriendship;


    @Test
    public void stage1_createFriendship() {
        ResponseEntity response = this.friendshipController.createFriendship(mockAskingFriendship());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        URI uri = response.getHeaders().getLocation();
        assertNotEquals("", uri);

        String[] splitUri = uri.toString().split("/");
        this.idFriendship = splitUri[splitUri.length -1];
    }

    @Test
    public void stage2_getFriendship() {
        ResponseEntity response = this.friendshipController.getFriendsShip("test1", "test2");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        FriendshipOdt friendshipOdt = (FriendshipOdt) response.getBody();

        assertNotNull(friendshipOdt);
    }

    @Test
    public void stage3_getWaitingInvitations() {
        ResponseEntity response = this.friendshipController.getWaitingInvitations("test2");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<Friendship> friendships = (List<Friendship>) response.getBody();

        assertNotNull(friendships);
        assertEquals(1, friendships.size());
    }

    @Test
    public void stage4_acceptFriendship() {
        ResponseEntity response = this.friendshipController.acceptFriendship(this.idFriendship);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void stage5_breakFriendship() {
        ResponseEntity response = this.friendshipController.refuseFriendship(this.idFriendship);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }


    @Test
    public void stageEnd() {
        this.mongoTemplate.remove(new Query(), Friendship.class);
    }

    @Test
    public void getFriendship_notFound() {
        ResponseEntity response = this.friendshipController.getFriendsShip("", "");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }


    protected AskingFriendShipOdt mockAskingFriendship() {

        return AskingFriendShipOdt.builder()
                .currentUser("test1")
                .people("test2")
                .build();
    }
}
