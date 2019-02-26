package com.projet.bookface.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Friend {

    private String idFriendship;
    private String lastName;
    private String firstName;
    private String since;
}
