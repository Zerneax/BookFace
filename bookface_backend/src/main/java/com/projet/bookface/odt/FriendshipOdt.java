package com.projet.bookface.odt;

import com.projet.bookface.models.Friendship;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FriendshipOdt {

	private Friendship friendship;
}
