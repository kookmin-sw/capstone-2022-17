package kookmin.capstone.backend.exception.authException;

public class ExistUserException extends Exception{
    public ExistUserException(String msg) {
        super(msg);
    }
}
