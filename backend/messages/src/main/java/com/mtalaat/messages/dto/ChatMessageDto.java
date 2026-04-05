package com.mtalaat.messages.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageDto {

    private Long id;
    private String message;
    private String senderId;
    private String receiverId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
