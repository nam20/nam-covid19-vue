package com.example.namlol.DB.Entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(length = 20, unique = true, nullable = false)
    private String userId;

    @Column(nullable = false)
    private String password;

    @Column(length = 10, nullable = false)
    private String nickName;

    private String token;

    private String profile;

    @OneToMany(mappedBy = "user")
    private List<Post> postList = new ArrayList<>();

    @Builder
    public User(String userId, String password, String nickName, String token, String profile, List<Post> postList){
        this.userId = userId;
        this.password = password;
        this.nickName = nickName;
        this.token = token;
        this.profile = profile;
        this.postList = postList;
    }

}
