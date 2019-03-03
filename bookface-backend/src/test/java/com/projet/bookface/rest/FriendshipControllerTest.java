package com.projet.bookface.rest;

import com.projet.bookface.controller.FriendshipController;
import com.projet.bookface.dao.FriendshipDao;
import com.projet.bookface.models.Friendship;
import com.projet.bookface.odt.AskingFriendShipOdt;
import com.projet.bookface.odt.FriendshipOdt;
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
public class FriendshipControllerTest {

    private FriendshipController friendshipController;
    private FriendshipDao friendshipDao;

    @Before
    public void setUp() {
        this.friendshipDao = Mockito.mock(FriendshipDao.class);

        this.friendshipController = new FriendshipController(this.friendshipDao);
    }

    @Test
    public void getFriendship_ok() {
        Mockito.when(this.friendshipDao.getFriendshipByUsers(Mockito.anyString(), Mockito.anyString())).thenReturn(mockFriendship());
        ResponseEntity response = this.friendshipController.getFriendsShip("test1", "test2");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        FriendshipOdt friendshipOdt = (FriendshipOdt) response.getBody();
        assertNotNull(friendshipOdt);
        assertEquals(mockFriendship(), friendshipOdt.getFriendship());
    }

    @Test
    public void getFriendship_notfound() {
        Mockito.when(this.friendshipDao.getFriendshipByUsers(Mockito.anyString(), Mockito.anyString())).thenReturn(null);
        ResponseEntity response = this.friendshipController.getFriendsShip("test1", "test2");
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void getWaitingInvitations_ok() {
        Mockito.when(this.friendshipDao.getWaitingFriendship(Mockito.anyString())).thenReturn(mockFriendships());
        ResponseEntity response = this.friendshipController.getWaitingInvitations("test2");
        assertEquals(HttpStatus.OK, response.getStatusCode());
        List<Friendship> friendships = (List<Friendship>) response.getBody();
        assertNotNull(friendships);
        assertEquals(2, friendships.size());
    }

    @Test
    public void createFriendship() {
        Mockito.when(this.friendshipDao.askToBeFriend(Mockito.any())).thenReturn(mockFriendship());
        ResponseEntity response = this.friendshipController.createFriendship(mockAskingFriendship());
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        URI uri = response.getHeaders().getLocation();
        assertNotEquals("", uri);

        String[] splitUri = uri.toString().split("/");
        assertEquals("123456789", splitUri[splitUri.length -1]);
    }

    @Test
    public void acceptFriendship() {
        ResponseEntity response = this.friendshipController.acceptFriendship("any");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void breakFriendship() {
        ResponseEntity response = this.friendshipController.refuseFriendship("any");
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }


    protected AskingFriendShipOdt mockAskingFriendship() {

        return AskingFriendShipOdt.builder()
                .currentUser("test1")
                .people("test2")
                .build();
    }

    protected Friendship mockFriendship() {
        return Friendship.builder()
                .id("123456789")
                .idUser1("test1")
                .idUser2("test2")
                .date("10/10/1980")
                .statut(Friendship.Statut.friends)
                .build();
    }

    protected List<Friendship> mockFriendships() {
        List<Friendship> liste = new ArrayList<>();

        liste.add(Friendship.builder()
                .id("123456789")
                .idUser1("test1")
                .idUser2("test2")
                .date("10/10/1980")
                .statut(Friendship.Statut.asking)
                .build());

        liste.add(Friendship.builder()
                .id("123456789")
                .idUser1("test1")
                .idUser2("test3")
                .date("10/10/1980")
                .statut(Friendship.Statut.asking)
                .build());

        return liste;
    }
}
