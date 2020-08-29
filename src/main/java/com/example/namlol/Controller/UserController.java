package com.example.namlol.Controller;

import com.example.namlol.DB.DTO.UserDTO;
import com.example.namlol.Service.UserService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {



    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }


    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> payload, HttpServletResponse response) throws Exception{
        return userService.register(payload);
    }

    @PostMapping("/login")
    public Map<String,Object> login(@RequestBody Map<String, String> payload) throws Exception {
        return userService.login(payload);
    }

    @PostMapping("")
    public UserDTO loadUser(HttpServletRequest request){
        String token = request.getHeader("Authorization");
        if(token == null) return null;
        return userService.loadUser(token);
    }

    @PostMapping("/nickname")
    public void changeNickname(@RequestBody Map<String, String> payload, @RequestHeader("Authorization") String token){
            userService.changeNickname(payload.get("nickname"),token);
    }

    @GetMapping("/naverCrawling")
    public List<Map<String,String>> naverClawling() throws IOException {
        return userService.naverClawling();
    }

    @GetMapping("/googleCrawling")
    public List<Map<String,String>> googleClawling() throws IOException {
        return userService.googleClawling();
    }

}
