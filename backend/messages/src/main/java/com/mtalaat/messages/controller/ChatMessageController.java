package com.mtalaat.messages.controller;


import com.mtalaat.messages.dto.ChatMessageDto;
import com.mtalaat.messages.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/api", produces = {MediaType.APPLICATION_JSON_VALUE})
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;


    @GetMapping("/findMessagesBetweenAuthUserAndOtherUser")
    public ResponseEntity<Object> findMessagesBetweenAuthUserAndOtherUser(@RequestHeader("mtalaat-correlation-id")                                                              String correlationId){
        return ResponseEntity.ok().body(chatMessageService.findMessagesBetweenAuthUserAndOtherUser());
    }

    @PostMapping("/sendMessageFromAuthUserToOtherUser")
    public ResponseEntity<Object> sendMessageFromAuthUserToOtherUser(@RequestBody ChatMessageDto request,  @RequestHeader("mtalaat-correlation-id")                                                              String correlationId){
        return ResponseEntity.ok().body(chatMessageService.sendMessageFromAuthUserToOtherUser(request));
    }
}
