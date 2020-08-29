package com.example.namlol.Service;

import com.example.namlol.DB.DTO.UserDTO;
import com.example.namlol.DB.Entity.User;
import com.example.namlol.Repository.UserRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final JwtProvider jwtProvider;

    private final PasswordEncoder passwordEncoder;

    private final ModelMapper modelMapper;

    public UserService(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
        this.modelMapper = modelMapper;
    }

    private static String NAVER_CRAWLING_URL = "https://search.naver.com/search.naver?query=%EC%BD%94%EB%A1%9C%EB%82%98+%ED%99%95%EC%A7%84%EC%9E%90&where=news&ie=utf8&sm=nws_hty";

    public Map<String,Object> register(Map<String,String> payload){
        Map<String,Object> map = new HashMap<>();
        if(userRepository.findByUserId(payload.get("userId")).isPresent()){
            map.put("fail","이미 있는 아이디입니다.");
            return map;
        }

        User user = User.builder()
                .userId(payload.get("userId"))
                .password(passwordEncoder.encode(payload.get("password")))
                .nickName(payload.get("nickname"))
                .build();
        userRepository.save(user);

        map.put("user",modelMapper.map(user, UserDTO.class));
        map.put("token",jwtProvider.createToken(user.getUserId()));
        return map;
    }

    public Map<String,Object> login(Map<String,String> payload) throws Exception {
        Map<String,Object> map = new HashMap<>();
        User user = userRepository.findByUserId(payload.get("userId")).orElse(null);
        if(user == null){
            map.put("fail","없는 아이디입니다.");
            return map;
        }
        if(! passwordEncoder.matches(payload.get("password"), user.getPassword())){
            map.put("fail","비밀번호가 틀렸습니다.");
            return map;
        }
        map.put("user",modelMapper.map(user, UserDTO.class));
        map.put("token",jwtProvider.createToken(user.getUserId()));
        return map;
    }

    public UserDTO loadUser(String token){
        Optional<User> userOptional = getUserByToken(token);
        return userOptional.map(user -> modelMapper.map(user, UserDTO.class)).orElse(null);
    }


    public void changeNickname(String nickname, String token) {
        Optional<User> userOptional = getUserByToken(token);
        userOptional.ifPresent(user -> {
            user.setNickName(nickname);
            userRepository.save(user);
        });
    }

    public Optional<User> getUserByToken(String token){
        String userId = jwtProvider.getUserId(token);
        if(userId == null) return Optional.empty();
        return userRepository.findByUserId(userId);
    }


    public List<Map<String,String>> naverClawling() throws IOException {

        Document doc = Jsoup.connect(NAVER_CRAWLING_URL).get();
        Elements contents = doc.select("div ul li dl dt a");
        List<Map<String,String>> res = new ArrayList<>();
        for(Element content : contents){
            Map<String,String> map = new HashMap<>();
            map.put("title",content.text());
            map.put("href",content.attr("href"));
            res.add(map);
        }
        return res;
        //System.out.println(contents);git
    }
}
