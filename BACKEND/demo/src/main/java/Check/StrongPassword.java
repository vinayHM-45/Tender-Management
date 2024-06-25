package Check;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordValidator.class)
public @interface StrongPassword {

    String message() default "Password must contain at least one uppercase letter, one lowercase letter, and one digit";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

