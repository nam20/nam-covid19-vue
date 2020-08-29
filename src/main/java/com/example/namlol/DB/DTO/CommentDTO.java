package com.example.namlol.DB.DTO;

import com.example.namlol.DB.Entity.Post;
import com.example.namlol.DB.Entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentDTO {

    private Long id;

    private String content;

    private Integer thumb;

    private User user;

    private Post post;

    private Boolean available;

    private LocalDateTime createdTime;

    private LocalDateTime lastModifiedTime;

    @Builder
    public CommentDTO(Long id, String content, Integer thumb, User user, Post post, Boolean available, LocalDateTime createdTime, LocalDateTime lastModifiedTime){
        this.id = id;
        this.content = content;
        this.thumb = thumb;
        this.user = user;
        this.post = post;
        this.available = available;
        this.createdTime = createdTime;
        this.lastModifiedTime = lastModifiedTime;
    }

}
