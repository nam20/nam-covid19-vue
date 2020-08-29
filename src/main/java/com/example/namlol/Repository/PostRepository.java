package com.example.namlol.Repository;

import com.example.namlol.DB.Entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findByTitle(String title);
}
