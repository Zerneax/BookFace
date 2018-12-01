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
@Document(collection = "user")
public class User {

	@Id
	private String id;
	
	// authentication
	private String mail;
	private String password;
	
	private String name;
	private String prenom;
	private String birthday;
	private String gender;
	
}
