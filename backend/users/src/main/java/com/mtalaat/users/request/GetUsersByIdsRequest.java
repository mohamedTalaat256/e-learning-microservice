package com.mtalaat.users.request;

import lombok.Data;

import java.util.List;

@Data
public class GetUsersByIdsRequest {
    List<Long> ids;
}
