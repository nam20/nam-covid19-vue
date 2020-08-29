package com.example.namlol.Service;

import com.example.namlol.DB.DTO.PostDTO;
import com.example.namlol.DB.Entity.Post;
import com.example.namlol.DB.Entity.User;
import com.example.namlol.Repository.PostRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class PostService {


    UserService userService;

    PostRepository postRepository;

    ModelMapper modelMapper;


    public PostService(UserService userService, PostRepository postRepository, ModelMapper modelMapper) {
        this.userService = userService;
        this.postRepository = postRepository;
        this.modelMapper = modelMapper;
    }

    public void addPost(Map<String, String> payload, String token) {

        Optional<User> userOptional = userService.getUserByToken(token);
        userOptional.ifPresent(user -> {
            Post post = Post.builder()
                    .title(payload.get("title"))
                    .content(payload.get("content"))
                    .thumb(0)
                    .user(user)
                    .comments(new ArrayList<>())
                    .build();
            postRepository.save(post);
        });
    }

    public List<PostDTO> loadAllPost(){
        List<Post> posts = postRepository.findAll();
        List<PostDTO> res = new ArrayList<>();
        for(Post post : posts)
            res.add(modelMapper.map(post, PostDTO.class));

        return res;
    }



}
