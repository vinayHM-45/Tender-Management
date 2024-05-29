package exception;


import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
	private static final long serialversionUID=1L;
	
	public ResourceNotFoundException(String messege) {
		super(messege);
	}
	
	
}
