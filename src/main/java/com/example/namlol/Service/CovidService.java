package com.example.namlol.Service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CovidService {

    private static String NAVER_CRAWLING_URL = "https://search.naver.com/search.naver?query=%EC%BD%94%EB%A1%9C%EB%82%98+%ED%99%95%EC%A7%84%EC%9E%90&where=news&ie=utf8&sm=nws_hty";
    private static String GOOGLE_CRAWLING_URL = "https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNREZqY0hsNUVnSmxiaWdBUAE/sections/CAQqEAgAKgcICjCcuZcLMI_irgMwwLvMBg?hl=en-US&gl=US&ceid=US%3Aen";
    private static String GEN_AGE_SERVICE_URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19GenAgeCaseInfJson";
    private static String CITY_SERVICE_URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
    private static String SERVICE_KEY = "eVRqXM%2Fkti1fL%2Bpq9ZyX%2Bihum64%2FnUDIKxXpKi2mQKkTdryJ%2FoEA3VutB3uo397Fghxz0vGULF%2F2YDUlj74B5w%3D%3D";

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

    public List<Map<String,String>> googleClawling() throws IOException{
        Document doc = Jsoup.connect(GOOGLE_CRAWLING_URL).get();
        Elements contents = doc.select("div.DBQmFf div.xrnccd");
        List<Map<String,String>> res = new ArrayList<>();
        for(int i=0; i<10; i++){
            Element element = contents.get(i).select("article h3 a").get(0);
            Map<String,String> map = new HashMap<>();
            map.put("title",element.text());
            map.put("href",element.attr("href"));
            res.add(map);
        }

        return res;
    }

    public String covidCase(String serviceCase) throws IOException{

        Date date = new Date();
        date.setTime(date.getTime() - 1000  * 60 * 60 * 24);

        StringBuilder urlBuilder =  new StringBuilder(); /*URL*/
        if(serviceCase.equals("genAge"))
            urlBuilder.append(GEN_AGE_SERVICE_URL);
        else if(serviceCase.equals("city"))
            urlBuilder.append(CITY_SERVICE_URL);

        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + SERVICE_KEY); /*Service Key*/
//        urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지번호*/
//        urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("10", "UTF-8")); /*한 페이지 결과 수*/
        urlBuilder.append("&" + URLEncoder.encode("startCreateDt","UTF-8") + "=" + URLEncoder.encode(new SimpleDateFormat("yyyyMMdd").format(date), "UTF-8")); /*검색할 생성일 범위의 시작*/
//        urlBuilder.append("&" + URLEncoder.encode("endCreateDt","UTF-8") + "=" + URLEncoder.encode("20200414", "UTF-8")); /*검색할 생성일 범위의 종료*/
        urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json","UTF-8"));
        URL url = new URL(urlBuilder.toString());

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        return sb.toString();
    }



}
