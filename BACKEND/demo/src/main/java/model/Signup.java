package model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import Check.StrongPassword;
import Check.UniqueEmail;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import jakarta.validation.constraints.Size;

import lombok.Data;


@Data
@Entity
@Table(name="signup")
public class Signup {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotBlank(message = "Name must not be blank")
	@Column(name = "name",length = 100)
	private String name;


	@NotEmpty
	@Email(message = "enter valid email")
	@Column(name = "email")
	@UniqueEmail
	private String email;
	
	@Column(name = "address")
	private String address;

	@NotEmpty
	@Size(min = 10, max = 10, message = "Contact must be exactly 10 characters")
	@Column(name = "contact")
	private String contact;
	
	
	@StrongPassword
	@Column(name = "password")
	private String password;

	public long getId() {
	return id;
}

	public void setId(long id) {
	this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void  setEmail(String email) {
		this.email = email;
	}
	
	
	public String getAddress() {
		return address;
	}

	
	public void setAddress(String address) {
		this.address = address;
	}

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	@JsonIgnore
	public String getPassword() {
		return password;
	}

	@JsonProperty
	public void setPassword(String password) {
		this.password = password;
	}

	public Signup(long id, String name, String email, String address, String contact, String password) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.address = address;
		this.contact = contact;
		this.password = password;
	}
	public Signup() {}
	
}
