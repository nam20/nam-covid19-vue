package com.example.namlol.DB.Entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Post {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(length = 20, nullable = false)
    private String title;

    @Column(length = 512, nullable = false)
    private String content;

    private Integer thumb;

    private Boolean available;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();

    @CreatedDate
    private LocalDateTime createdTime;

    @LastModifiedDate
    private LocalDateTime lastModifiedTime;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder
    public Post(String title, String content, List<Comment> comments, User user, Integer thumb){
        this.title = title;
        this.thumb = thumb;
        this.content = content;
        this.comments = comments;
        this.available = true;
        this.user = user;
    }
}
