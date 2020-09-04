package com.example.namlol.Controller;

import com.example.namlol.Service.CovidService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/covid")
public class CovidController {

    CovidService covidService;

    public CovidController(CovidService covidService) {
        this.covidService = covidService;
    }

    @GetMapping("/news/naver")
    public List<Map<String,String>> naverClawling() throws IOException {
        return covidService.naverClawling();
    }

    @GetMapping("/news/google")
    public List<Map<String,String>> googleClawling() throws IOException {
        return covidService.googleClawling();
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

}
