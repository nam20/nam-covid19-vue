package com.example.namlol.Service;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.stereotype.Service;

import javax.print.Doc;
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
    private static String DAY_SERVICE_URL = "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson";
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

    }

    public List<Map<String,String>> googleClawling() throws IOException{
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
        //System.out.println(yesterdayContent);

        for(Element content : contents){
            Elements elements = content.select("td");
            Map<String,String> map = new HashMap<>();
            map.put("country",elements.get(1).text());
            map.put("confirmed",elements.get(2).text());
            map.put("deaths",elements.get(4).text());
            map.put("recovered",elements.get(6).text());
            res.add(map);
        }
        return res;
    }

    private WebDriver driver;
    private WebElement element;
    private String url;

    public static String WEB_DRIVER_ID = "webdriver.chrome.driver";
    public static String WEB_DRIVER_PATH = "C:/chromedriver.exe";
    public static String TEST_URL = "https://www.youtube.com/results?search_query=%EC%BD%94%EB%A1%9C%EB%82%98";

    public void seleniumTest(){
        System.setProperty(WEB_DRIVER_ID, WEB_DRIVER_PATH);
        ChromeOptions options = new ChromeOptions();
        options.setCapability("ignoreProtectedModeSettings", true);
        driver = new ChromeDriver(options);
        try{
            driver.get(TEST_URL);
            element =  driver.findElement(By.xpath("//*[@id='dismissable']"));
            System.out.println(driver);
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    public List<Map<String,String>> youtubeCrawling() throws IOException{
        List<Map<String,String>> res = new ArrayList<>();
        Document doc = Jsoup.connect("https://www.youtube.com/results?search_query=%EC%BD%94%EB%A1%9C%EB%82%98")

                .get();

        Elements contents = doc.select("div#container");
        System.out.println("====");
        System.out.println(doc);

        return res;
    }

    public String youtubeTestCrawling() throws IOException{
        List<Map<String,String>> res = new ArrayList<>();
        Document doc = Jsoup.connect("https://www.youtube.com/results?search_query=%EC%BD%94%EB%A1%9C%EB%82%98")
                .timeout(100000)
                .get();

        Elements contents = doc.select("body");
        System.out.println("====");
        System.out.println(contents);

        return doc.toString();
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

    public String worldCase(String serviceCase) throws IOException{
        StringBuilder urlBuilder =  new StringBuilder(); /*URL*/
        if(serviceCase.equals("daily"))
            urlBuilder.append("https://covid19.mathdro.id/api/daily");
        else if(serviceCase.equals("confirmed"))
            urlBuilder.append("https://covid19.mathdro.id/api/confirmed");

        URL url = new URL(urlBuilder.toString());

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
