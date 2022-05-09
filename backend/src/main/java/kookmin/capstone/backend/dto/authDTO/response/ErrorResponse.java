package kookmin.capstone.backend.dto.authDTO.response;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class ErrorResponse {

    private String statusCode;
    private String errorContent;
    private List<String> messages;

    public ErrorResponse(String statusCode, String errorContent, String messages) {
        this.statusCode = statusCode;
        this.errorContent = errorContent;
        this.messages = new ArrayList<>();
        this.messages.add(messages);
    }

    public ErrorResponse(String statusCode, String errorContent, List<String> messages) {
        this.statusCode = statusCode;
        this.errorContent = errorContent;
        this.messages = messages;
    }
}