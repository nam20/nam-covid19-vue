package com.example.namlol.Controller;

import com.example.namlol.Service.CovidService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/naverCrawling")
    public List<Map<String,String>> naverClawling() throws IOException {
        return covidService.naverClawling();
    }

    @GetMapping("/googleCrawling")
    public List<Map<String,String>> googleClawling() throws IOException {
        return covidService.googleClawling();
    }

    @GetMapping("/caseGenAge")
    public String caseGenAge() throws IOException{
        return covidService.caseGenAge();
    }

}
