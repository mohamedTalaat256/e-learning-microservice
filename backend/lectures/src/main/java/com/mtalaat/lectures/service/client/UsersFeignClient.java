package com.mtalaat.lectures.service.client;

import com.mtalaat.lectures.dto.InstructorDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient("users")
public interface UsersFeignClient {

    @GetMapping(value = "/api/getUsersByIds",consumes = "application/json")
    ResponseEntity<List<InstructorDto>> getInstructorsByIds(@RequestHeader("mtalaat-correlation-id") String correlationId,
                                                            @RequestParam("ids") List<String> instructorIds);

    @GetMapping(value = "/api/getUserById",consumes = "application/json")
    ResponseEntity<InstructorDto> getInstructorById(@RequestHeader("mtalaat-correlation-id") String correlationId, @RequestParam("id") String instructorId);
}
