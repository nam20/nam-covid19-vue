package com.example.namlol.Service;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class CovidServiceTest {

    @Autowired
    CovidService covidService;

    @Autowired
    ServletContext servletContext;

    @Test
    public void test(){
        System.out.println(servletContext.getRealPath("/images/corona-1.jpg"));
        System.out.println(new File(servletContext.getRealPath("/favicon.ico")).exists());
    }


    @Test
    void worldOmeterCrawling() throws IOException {

        covidService.worldOmeterCrawling();
    }

    @Test
    void testCrawling() throws IOException{
        covidService.testCrawling();
    }
}