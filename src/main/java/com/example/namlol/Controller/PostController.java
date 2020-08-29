package com.example.namlol.Controller;

import com.example.namlol.DB.DTO.PostDTO;
import com.example.namlol.Service.PostService;
import com.example.namlol.Service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/post")
public class PostController {

    UserService userService;

    PostService postService;

    public PostController(UserService userService, PostService postService) {
        this.userService = userService;
        this.postService = postService;
    }

    @PostMapping("")
    public void addPost(@RequestBody Map<String,String> payload, @RequestHeader(value = "Authorization",required = false) String token){
        if(token == null)
            return;
         postService.addPost(payload, token);
    }

    @GetMapping("")
    public List<PostDTO> loadAllPost(){
        return postService.loadAllPost();
    }




}
