package com.example.namlol.Repository;

import com.example.namlol.DB.Entity.User;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository boardRepository;

    @Test
    void findByNickName() {
        User user = User.builder()
                .nickName("n33")
                .password("343434343")
                .userId("nam")
                .build();
        userRepository.save(user);

        Optional<User> optuser = userRepository.findByUserId("nam");
        optuser.ifPresent((user1 -> {
            System.out.println(user.getNickName());
        }));
    }
}