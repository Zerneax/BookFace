package com.projet.bookface.service;

import com.projet.bookface.dao.UserDao;
import com.projet.bookface.exception.BackendException;
import com.projet.bookface.models.Friend;
import com.projet.bookface.models.User;
import org.springframework.stereotype.Service;

@Service
public class FriendService {

    private UserDao userDao;

    public FriendService(UserDao userDao) {
        this.userDao = userDao;
    }

    public Friend getDetailFriendship(String idUser) throws BackendException {
        User user = this.userDao.findById(idUser);

        Friend f;
        if (user != null) {
            f = Friend.builder().lastName(user.getLastName()).firstName(user.getFirstName()).build();
        } else {
            throw new BackendException("Unknow User !");
        }

        return f;
    }
}
