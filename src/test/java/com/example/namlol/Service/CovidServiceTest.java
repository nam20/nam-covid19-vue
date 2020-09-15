package com.example.namlol.Service;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class CovidServiceTest {

    private final CovidService covidService;

    @Autowired
    public CovidServiceTest(CovidService covidService) {
        this.covidService = covidService;
    }

    @Test
    void worldOmeterCrawling() throws IOException {
        covidService.worldOmeterCrawling();
    }


    @Test
    void googleCrawling() throws IOException{
        covidService.googleCrawling();
    }

    @Test
    void youtubeSearch() throws IOException{
        covidService.youtubeSearch();
    }


}