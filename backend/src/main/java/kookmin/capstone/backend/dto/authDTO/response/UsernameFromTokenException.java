package kookmin.capstone.backend.dto.authDTO.response;

public class UsernameFromTokenException extends Exception{
    public UsernameFromTokenException(String msg) {
        super(msg);
    }
}
