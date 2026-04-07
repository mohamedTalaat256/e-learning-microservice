package com.mtalaat.messages.repository;

import com.mtalaat.messages.entity.ChatMessage;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT m FROM ChatMessage m WHERE " +
            "(m.senderId = :authUser AND m.receiverId = :otherUser) OR " +
            "(m.senderId = :otherUser AND m.receiverId = :authUser) " +
            "ORDER BY m.createdAt ASC")
    List<ChatMessage> findConversation(@Param("authUser") String authUser,
                                       @Param("otherUser") String otherUser);
}