package com.example.namlol;

import com.example.namlol.DB.Entity.Post;
import com.example.namlol.DB.Entity.User;
import com.example.namlol.Repository.PostRepository;
import com.example.namlol.Repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class NamLolApplicationTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Test
    void main() {
        User user = User.builder()
                .nickName("이니셜라이저")
                .userId("ddfdffdd8")
                .password("7415")
                .build();
        userRepository.save(user);

        Post post = Post.builder()
                .user(user)
                .title("d")
                .content("dd")
                .build();
        postRepository.save(post);
        List<Post> posts = postRepository.findAll();
        System.out.println(posts.get(2).getCreatedTime());
        assertNotNull(posts.get(2).getCreatedTime());

    }
}