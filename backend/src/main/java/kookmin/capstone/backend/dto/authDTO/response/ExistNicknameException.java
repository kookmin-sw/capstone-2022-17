package kookmin.capstone.backend.dto.authDTO.response;

public class ExistNicknameException extends Exception{
    public ExistNicknameException(String msg) {
        super(msg);
    }
}
