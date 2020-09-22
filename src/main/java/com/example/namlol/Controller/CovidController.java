package com.example.namlol.Controller;

import com.example.namlol.Service.CovidService;
import org.openqa.selenium.WebElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/covid")
public class CovidController {

    private final CovidService covidService;

    @Autowired
    public CovidController(CovidService covidService) {
        this.covidService = covidService;
    }

    @GetMapping("/news/naver")
    public List<Map<String,String>> naverCrawling() throws IOException {
        return covidService.naverCrawling();
    }

    @GetMapping("/news/google")
    public List<Map<String,String>> googleCrawling() throws IOException {
        return covidService.googleCrawling();
    }

    @GetMapping("/korea/{serviceCase}")
    public String caseGenAge(@PathVariable String serviceCase) throws IOException{
        return covidService.koreaCase(serviceCase);
    }

    @GetMapping("/world/{serviceCase}")
    public String worldTotal(@PathVariable String serviceCase) throws IOException{
        return covidService.worldCase(serviceCase);
    }

    @GetMapping("/world")
    public List<Map<String,String>> worldOmeter() throws IOException{
        return covidService.worldOmeterCrawling();
    }

    @GetMapping("/youtube")
    public String youtubeSearch() throws IOException{
        return covidService.youtubeSearch();
    }

    @GetMapping("/test")
    public void test() throws IOException{

    }

}
