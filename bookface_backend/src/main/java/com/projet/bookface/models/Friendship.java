package com.projet.bookface.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "friends")
public class Friendship {

	@Id
	private String id;
	private String idUser1;
	private String idUser2;
	private Statut statut;
	
	public enum Statut {
		asking,
		friends
	}
}
