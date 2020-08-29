package com.example.namlol.DB.DTO;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserDTOTest {

    @Test
    void builder() {
        UserDTO userDTO = UserDTO.builder()
                .id(21L)

                .nickName("이니셜라이저")

                .build();
        assertEquals(21L, userDTO.getId());
    }
}