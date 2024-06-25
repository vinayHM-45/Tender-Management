package controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import model.Signup;
import repositry.SignupRepositry;  

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/")
public class SignupController {
    @Autowired
    private SignupRepositry signuprepository;  

    @GetMapping("/signup")
    public List<Signup> getAllSignups() {
        return signuprepository.findAll();
    }
    @Transactional
    @PostMapping("/signup")
    public Signup applyTenders(@Valid @RequestBody Signup signup) {
    	return  signuprepository.save(signup);
    }
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Map<String, Object> response = new HashMap<>();
        Optional<Signup> userOptional = signuprepository.findByEmail(email);

        if (userOptional.isPresent()) {
            Signup user = userOptional.get();

            if (password.equals(user.getPassword())) {
                // Password matches, generate JWT token
                String token = generateJwtToken(email);
                response.put("token", token);
                response.put("user", user);     } 
            else {
                response.put("error", "Invalid credentials");
            }
        } else {
            response.put("error", "Invalid credentials");
        }

        return response;
    }

    private String generateJwtToken(String subject) {
        long expirationTime = 86400000;
        KeyPair keyPair = generateKeyPair();

        if (keyPair == null) {
            return null;
        }

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(keyPair.getPrivate(), SignatureAlgorithm.RS256)
                .compact();
    }
    private KeyPair generateKeyPair() {
        try {
            KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance("RSA");
            keyPairGenerator.initialize(2048);
            return keyPairGenerator.generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            // Handle exception or log an error
            e.printStackTrace();
            return null;
        }
    
    }
    
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleMethodArgsNotValidException(MethodArgumentNotValidException ex) {
    	 Map<String, String> resp = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            if (error instanceof FieldError) {
                FieldError fieldError = (FieldError) error;
                String fieldName = fieldError.getField();
                String message=fieldError.getDefaultMessage();
                resp.put(fieldName, message);
            }
        });
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }
}
