package com.example.namlol.DB.DTO;

import com.example.namlol.DB.Entity.Comment;
import com.example.namlol.DB.Entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PostDTO {

    private Long id;

    private String title;

    private String content;

    private Integer thumb;

    private Boolean available;

    private List<Comment> comments = new ArrayList<>();

    private LocalDateTime createdTime;

    private LocalDateTime lastModifiedTime;

    private User user;

    public PostDTO(Long id, String title, String content, Integer thumb, Boolean available, List<Comment> comments, LocalDateTime createdTime,
                   LocalDateTime lastModifiedTime, User user){
        this.id = id;
        this.title = title;
        this.content = content;
        this.thumb = thumb;
        this.available = available;
        this.content = content;
        this.createdTime = createdTime;
        this.lastModifiedTime = lastModifiedTime;
        this.user = user;
    }

}
