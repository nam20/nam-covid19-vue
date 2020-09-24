package com.example.namlol.Service;


import org.jsoup.Jsoup;
import org.jsoup.nodes.DataNode;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CovidService {

    private static String NAVER_CRAWLING_URL = "https://search.naver.com/search.naver?query=%EC%BD%94%EB%A1%9C%EB%82%98+%ED%99%95%EC%A7%84%EC%9E%90&where=news&ie=utf8&sm=nws_hty";
    private static String GOOGLE_CRAWLING_URL = "https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNREZqY0hsNUVnSmxiaWdBUAE/sections/CAQqEAgAKgcICjCcuZcLMI_irgMwwLvMBg?hl=en-US&gl=US&ceid=US%3Aen";
    private static String GEN_AGE_SERVICE_URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19GenAgeCaseInfJson";
    private static String CITY_SERVICE_URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
    private static String DAY_SERVICE_URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
    private static String YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

    @Value("${covid.korea.service.key}")
    private String SERVICE_KEY;

    @Value("${youtube.api.key}")
    private String YOUTUBE_API_KEY;

    public List<Map<String,String>> naverCrawling() throws IOException {
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
    }

    public List<Map<String,String>> googleCrawling() throws IOException{
        Document doc = Jsoup.connect(GOOGLE_CRAWLING_URL).get();
        Elements contents = doc.select("div.DBQmFf div.xrnccd");
        List<Map<String,String>> res = new ArrayList<>();
        for(int i=0; i<10; i++){
            Element element = contents.get(i).select("article h3 a").get(0);
            Map<String,String> map = new HashMap<>();
            map.put("title",element.text());
            StringBuilder sb = new StringBuilder("https://news.google.com");
            sb.append(element.attr("href").substring(1));
            map.put("href",sb.toString());
            res.add(map);
        }

        return res;
    }

    public List<Map<String,String>> worldOmeterCrawling() throws IOException{

        List<Map<String,String>> res = new ArrayList<>();
        Document doc = Jsoup.connect("https://www.worldometers.info/coronavirus").get();
        Elements contents = doc.select("table#main_table_countries_yesterday tbody tr:nth-child(n+8)");
        Element yesterdayContent = doc.select("table#main_table_countries_yesterday2 tbody tr:nth-child(8)").first();
        contents.add(0, yesterdayContent);

        for(Element content : contents){
            Elements elements = content.select("td");
            Map<String,String> map = new HashMap<>();
            map.put("country",elements.get(1).text());
            map.put("confirmed",elements.get(2).text());
            map.put("deaths",elements.get(4).text());
            map.put("recovered",elements.get(6).text());
            res.add(map);
        }
        System.out.println(System.getProperty("user.dir"));
        return res;
    }

//    public void testSelenium(){
//        // 현재 package의 workspace 경로, Windows는 [ chromedriver.exe ]
//        Path path = Paths.get(System.getProperty("user.dir"), "src/main/resources/chromedriver");  // 현재 package의
//        System.out.println(path.toString());
//        // WebDriver 경로 설정
//        System.setProperty("webdriver.chrome.driver", "C:/chromedriver.exe");
//
//        // WebDriver 옵션 설정
//        ChromeOptions options = new ChromeOptions();
//        //options.addArguments("--start-maximized");            // 전체화면으로 실행
//        options.addArguments("--disable-popup-blocking");    // 팝업 무시
//        options.addArguments("--disable-default-apps");     // 기본앱 사용안함
//
//        // WebDriver 객체 생성
//        ChromeDriver driver = new ChromeDriver( options );
//
//        // 빈 탭 생성
//       // driver.executeScript("window.open('about:blank','_blank');");
//
//        // 탭 목록 가져오기
//       // List<String> tabs = new ArrayList<String>(driver.getWindowHandles());
//
//        // 첫번째 탭으로 전환
//      //  driver.switchTo().window(tabs.get(0));
//
//        // 웹페이지 요청
//        driver.get("https://www.youtube.com/results?search_query=%EC%BD%94%EB%A1%9C%EB%82%9819");
//
//        // 웹페이지 소스 출력
//        //System.out.println( driver.getPageSource() );
//        List<WebElement> list  =  driver.findElementsByCssSelector("div#contents ytd-video-renderer"); //driver.findElementsByXPath("//*[@id=\"items\"]/ytd-video-renderer");
//
//        // 탭 종료
//        //driver.close();
//
//        // 5초 후에 WebDriver 종료
//        try {
//            Thread.sleep(10);
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        } finally {
//            // WebDriver 종료
//            driver.quit();
//        }
//    }



    public String youtubeSearch() throws IOException{
        StringBuilder urlBuilder =  new StringBuilder(YOUTUBE_SEARCH_URL); /*URL*/

        urlBuilder.append("?" + URLEncoder.encode("key","UTF-8") + "=" + YOUTUBE_API_KEY);
        urlBuilder.append("&" + URLEncoder.encode("part","UTF-8") + "=" + URLEncoder.encode("snippet","UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("maxResults","UTF-8") + "=" + URLEncoder.encode("3","UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("q","UTF-8") + "=" + URLEncoder.encode("코로나","UTF-8"));

        URL url = new URL(urlBuilder.toString());
        return httpApiReq(url);
    }

    public String koreaCase(String serviceCase) throws IOException{

        Date date = new Date();
        date.setTime(date.getTime() - 1000  * 60 * 60 * 24);

        StringBuilder urlBuilder =  new StringBuilder(); /*URL*/
        if(serviceCase.equals("genAge"))
            urlBuilder.append(GEN_AGE_SERVICE_URL);

        else if(serviceCase.equals("city"))
            urlBuilder.append(CITY_SERVICE_URL);

        else if(serviceCase.equals("day"))
            urlBuilder.append(DAY_SERVICE_URL);


        urlBuilder.append("?" + URLEncoder.encode("ServiceKey","UTF-8") + "=" + SERVICE_KEY); /*Service Key*/

        if(serviceCase.equals("day"))
            urlBuilder.append("&" + URLEncoder.encode("endCreateDt","UTF-8") + "=" + URLEncoder.encode(new SimpleDateFormat("yyyyMMdd").format(new Date()), "UTF-8"));
        else
            urlBuilder.append("&" + URLEncoder.encode("startCreateDt","UTF-8") + "=" + URLEncoder.encode(new SimpleDateFormat("yyyyMMdd").format(date), "UTF-8"));
        urlBuilder.append("&" + URLEncoder.encode("_type","UTF-8") + "=" + URLEncoder.encode("json","UTF-8"));
        URL url = new URL(urlBuilder.toString());

        return httpApiReq(url);
    }

    public String worldCase(String serviceCase) throws IOException{
        StringBuilder urlBuilder =  new StringBuilder(); /*URL*/
        if(serviceCase.equals("daily"))
            urlBuilder.append("https://covid19.mathdro.id/api/daily");
        else if(serviceCase.equals("confirmed"))
            urlBuilder.append("https://covid19.mathdro.id/api/confirmed");

        URL url = new URL(urlBuilder.toString());


        return httpApiReq(url);
    }

    public String httpApiReq(URL url) throws IOException{
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        //System.out.println("Response code: " + conn.getResponseCode());
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
