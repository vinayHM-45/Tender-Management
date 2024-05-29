package Check;

import repositry.SignupRepositry;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import model.Signup;

@Component
public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {

    private final SignupRepositry signuprepository;
    
    @Autowired
    public UniqueEmailValidator(SignupRepositry signuprepository) {
        this.signuprepository = signuprepository;
    }
    public UniqueEmailValidator() {
        this.signuprepository = null;
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email != null && signuprepository != null) {
            Optional<Signup> existingUser = signuprepository.findByEmail(email);
            return existingUser.isEmpty();
        }
        return true;
    }
}

