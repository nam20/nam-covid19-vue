package com.example.namlol.DB.DTO;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {

    private Long id;

    private String userId;

    private String password;

    private String nickName;

    private String tier;

    private String token;

    private String profile;

    @Builder
    public UserDTO(Long id, String userId, String password, String nickName, String tier, String token, String profile){
        this.id = id;
        this.userId = userId;
        this.password = password;
        this.nickName = nickName;
        this.tier = tier;
        this.token = token;
        this.profile = profile;
    }
}
