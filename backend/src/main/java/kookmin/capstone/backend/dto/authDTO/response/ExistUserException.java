package kookmin.capstone.backend.dto.authDTO.response;

public class ExistUserException extends Exception{
    public ExistUserException(String msg) {
        super(msg);
    }
}
