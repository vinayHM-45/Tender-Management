package model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
@Entity
@Table(name="tendersapplied")
public class AppliedTenders {

	public AppliedTenders() {
		this.status = "applied";
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Email(message = "enter valid email")
	@Column(name = "email")
	private String email;

	@Column(name = "details")
	private String details;
	
	@Column(name = "amount")
	private double amount;
	
	@Column(name="status")
	private String status;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public void setStatus(String status) {
        this.status = status != null ? status : "applied"; // Set initial status to "applied" if null
    }
	
    public String getStatus() {
        return status;
    }

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}
	

}
