package com.example.namlol.Controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@RestController
public class TestController {

    @GetMapping("/apitest")
    public String lol_api(){

        StringBuffer res = new StringBuffer();
        try{
            String urlstr = "https://api.pandascore.co/lol/matches/upcoming?token=X0o4vH9HNJquZu0I4AClSKwe6T-TY6wevBHfYXDeGb1JoihssJQ";
            URL url = new URL(urlstr);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");

            BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));

            String returnLine;
            while((returnLine = br.readLine()) != null){
                res.append(returnLine);
            }
            urlConnection.disconnect();
        }catch (Exception e){
            e.printStackTrace();
        }

        return res.toString();
    }



}
