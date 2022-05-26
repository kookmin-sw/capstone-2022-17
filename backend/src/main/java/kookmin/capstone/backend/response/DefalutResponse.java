package kookmin.capstone.backend.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class DefalutResponse<T> {

    private int statusCode;
    private String responseMessage;
    private T data;

    public DefalutResponse(final int statusCode, final String responseMessage) {
        this.statusCode = statusCode;
        this.responseMessage = responseMessage;
        this.data = null;
    }

    public static<T> DefalutResponse<T> res(final int statusCode, final String responseMessage) {
        return res(statusCode, responseMessage, null);
    }

    public static<T> DefalutResponse<T> res(final int statusCode, final String responseMessage, final T t) {
        return DefalutResponse.<T>builder()
                .data(t)
                .statusCode(statusCode)
                .responseMessage(responseMessage)
                .build();
    }
}