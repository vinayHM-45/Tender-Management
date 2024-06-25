package repositry;

import java.util.Optional; 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import model.Signup;

@Repository
public interface SignupRepositry extends JpaRepository<Signup, Long> {
	Optional<Signup> findByEmail(String email);

}
