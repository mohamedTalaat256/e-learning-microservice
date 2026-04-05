package com.mtalaat.messages.service;

import com.mtalaat.messages.dto.ChatMessageDto;
import com.mtalaat.messages.entity.ChatMessage;
import com.mtalaat.messages.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageService {

    @Autowired
    ChatMessageRepository chatMessageRepository;

    public List<ChatMessage> findMessagesBetweenAuthUserAndOtherUser(){
        String authId ="4eb6e02a-2c54-4ce9-b2b2-bf90c2d4b512";
        List<ChatMessage> messages = chatMessageRepository.findBySenderIdOrReceiverId(authId, authId);
        return messages;
    }

    public ChatMessage sendMessageFromAuthUserToOtherUser(ChatMessageDto request){
        String senderId ="4eb6e02a-2c54-4ce9-b2b2-bf90c2d4b512";

        ChatMessage message =  ChatMessage.builder().senderId(senderId)
                .message(request.getMessage())
                .receiverId(request.getReceiverId())
                .build();

        return chatMessageRepository.save(message);
    }
}
