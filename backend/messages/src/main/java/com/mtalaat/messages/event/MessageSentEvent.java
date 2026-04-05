package com.mtalaat.messages.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageSentEvent {
    private Long id;
    private String message;
    private String sender;
    private String receiver;
}
