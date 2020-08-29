package com.example.namlol.Service;

import com.example.namlol.DB.Entity.Post;
import com.example.namlol.DB.Entity.Comment;
import com.example.namlol.DB.Entity.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CommentService {
    public void test(){
        Post post = Post.builder().build();
        User user = User.builder().build();
        Comment comment = Comment.builder()
                .post(post)
                .user(user)
                .content("d")
                .commentList(new ArrayList<>())
                .build();

    }
}
