package com.nghuytan.carmanager.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<Object> handleCustomException(CustomException ex) {
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(new ErrorResponse(ex.getMessage(), ex.getStatusCode()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGenericException() {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Đã xảy ra lỗi không xác định", HttpStatus.INTERNAL_SERVER_ERROR.value()));
    }

    @Getter
    public static class ErrorResponse {
        private final String message;
        private final int statusCode;

        public ErrorResponse(String message, int statusCode) {
            this.message = message;
            this.statusCode = statusCode;
        }

    }
}
