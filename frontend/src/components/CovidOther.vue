<template>
    <v-row >
        <v-col cols="12" sm="12" md="6">
            <v-row>
                <v-col cols="12" class="pt-0">
                    <chart-card>
                        <template v-slot:title>
                            유튜브 관련 영상
                        </template>
                        <template v-slot:body>
                            <v-card 
                            v-for="item in youtubeList" 
                            :key="item" 
                            class="px-2" 
                            tile outlined 
                            :href="`https://www.youtube.com/watch?v=${item.id.videoId}`" 
                            target="_blank">
                                <v-row align="center">
                                    <v-col cols="12" sm="4">
                                        <v-img :src="item.snippet.thumbnails.medium.url"></v-img>
                                    </v-col>
                                    <v-col cols="12" sm="8">
                                        <v-card-title v-text="decodeHtmlEntity(item.snippet.title)" class="mb-2"></v-card-title>
                                        <v-card-subtitle v-text="item.snippet.description"></v-card-subtitle>
                                    </v-col>
                                </v-row>
                                
                            </v-card>
                        </template>
                    </chart-card>
                </v-col>
                <v-col cols="12" >
                    <chart-card>
                        <template v-slot:title>
                            전염병 통계 비교
                        </template>
                        <template v-slot:body>
                            <v-simple-table class="py-3" >
                                <thead>
                                    <tr>
                                        <th><h3>병명</h3></th>
                                        <th><h2>코로나 19</h2> </th>
                                        <th><h2>MERS</h2> </th>
                                        <th><h2>SARS</h2> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>발생연도</td>
                                        <td class="covid">2019</td>
                                        <td>2012</td>
                                        <td>2003</td>
                                    </tr>
                                    <tr>
                                        <td>확진자</td>
                                        <td class="covid">{{todayWorldTotal.totalConfirmed}}</td>
                                        <td>2,494</td>
                                        <td>8,096</td>
                                    </tr>
                                    <tr>
                                        <td>한국 확진자</td>
                                        <td class="covid">{{todayKoreaTotal.totalConfirmed}}</td>
                                        <td>186</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>사망자</td>
                                        <td class="covid">{{todayWorldTotal.totalDeaths}}</td>
                                        <td>858</td>
                                        <td>774</td>
                                    </tr>
                                    <tr>
                                        <td>한국 사망자</td>
                                        <td class="covid">{{todayKoreaTotal.totalDeaths}}</td>
                                        <td>38</td>
                                        <td>0</td>
                                    </tr>
                                    <tr>
                                        <td>치명율</td>
                                        <td class="covid">{{todayWorldTotal.totalCritical}}%</td>
                                        <td>34.4%</td>
                                        <td>9.6%</td>
                                    </tr>
                                    <tr>
                                        <td>영향국가</td>
                                        <td class="covid">214</td>
                                        <td>27</td>
                                        <td>26</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </template>
                    </chart-card>
                </v-col>
            </v-row>
            
        </v-col>
        <v-col cols="12" sm="12" md="6" class="pt-0"> 
            <v-row>
                <v-col cols="12" id="cityConfirmed">
                    <chart-card>
                        <template v-slot:title>
                            확진자 동향
                        </template>
                        <template v-slot:body>
                            <v-row justify="center">
                                <v-col cols="10">
                                    <v-btn 
                                    tile outlined color="#4678eb" 
                                    class="ma-2"
                                    v-for="city in cityCovidPages" :key="city" :href="city[1]" target="_blank">
                                        {{city[0]}}
                                    </v-btn>
                                    <ul class="my-2">
                                        <li class="text-caption">지역을 클릭하면 확진자 상세정보가 있는 지자체 홈페이지 새 창이 열립니다.</li>
                                    </ul>
                                    <!-- <v-card-text></v-card-text> -->
                                </v-col>
                            </v-row>
                        </template>
                    </chart-card>
                    
                </v-col>
                <v-col cols="12" id="covidPrevention">
                    <chart-card >
                        <template v-slot:title>
                            예방 행동 수칙
                        </template>
                        <template v-slot:body>
                            <v-carousel
                            cycle
                            hide-delimiter-background
                            show-arrows-on-hover
                            height="auto"
                            >
                                <v-carousel-item
                                v-for="slide in imageSlides"
                                :key="slide"
                                >
                                    <v-img :src="slide.src" 
                                    aspect-ratio="0.7142"
                                    max-height="800"
                                    contain>
                                        <template v-slot:placeholder>
                                            <v-row
                                            class="fill-height ma-0"
                                            align="center"
                                            justify="center"
                                            >
                                                <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
                                            </v-row>
                                        </template>
                                    </v-img>
                                </v-carousel-item>
                            </v-carousel>
                        </template>
                    </chart-card>
                </v-col>
                <v-col cols="12">
                    <chart-card>
                        <template v-slot:title>
                            데이터 출처
                        </template>
                        <template v-slot:body>
                            <v-row justify="center">
                                <v-col cols="10">
                                    <ul>
                                        <li v-for="source in dataSources" :key="source">
                                            <a :href="source[0]" class="text-decoration-none" target="_blank" v-text="source[1]"></a>
                                        </li>
                                    </ul>
                                </v-col>
                            </v-row>
                            
                        </template>
                        
                    </chart-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import ChartCard from '@/components/ChartCard'

export default {
    components:{
        ChartCard
    },
    props:['koreaTotalData','worldTotalData'],
    data(){
        return {
            todayKoreaTotal : '',
            todayWorldTotal : '',
            youtubeList:[],
            cityCovidPages:[
                ['서울', 'https://www.seoul.go.kr/coronaV/coronaStatus.do'],
                ['부산', 'http://www.busan.go.kr/covid19/Corona19.do'],
                ['대구', 'http://covid19.daegu.go.kr/00936598.html'],
                ['인천', 'https://www.incheon.go.kr/health/HE020409'],
                ['광주', 'https://www.gwangju.go.kr/c19/c19/contentsView.do?pageId=coronagj2'],
                ['대전', 'https://www.daejeon.go.kr/corona19/index.do?menuId=0002'],
                ['울산', 'http://www.ulsan.go.kr/corona.jsp'],
                ['세종', 'https://www.sejong.go.kr/bbs/R3391/list.do'],
                ['경기', 'https://www.gg.go.kr/bbs/board.do?bsIdx=722&menuId=2903#page=1'],
                ['강원', 'https://www.provin.gangwon.kr/covid-19.html'],
                ['충북', 'https://www1.chungbuk.go.kr/covid-19/index.do'],
                ['충남', 'http://www.chungnam.go.kr/coronaStatus.do'],
                ['전북', 'https://www.jeonbuk.go.kr/board/list.jeonbuk?boardId=BBS_0000107&menuCd=DOM_000000110006000000&contentsSid=1224&cpath='],
                ['전남', 'https://www.jeonnam.go.kr/coronaMainPage.do'],
                ['경북', 'http://gb.go.kr/corona_main.htm'],
                ['경남', 'http://xn--19-q81ii1knc140d892b.kr/main/main.do'],
                ['제주', 'https://www.jeju.go.kr/wel/healthCare/corona/coronaNotice.htm']
            ],
            imageSlides:[
                {
                    src: 'images/corona-1.jpg'
                },
                {
                    src: 'images/corona-2.jpg'
                },
                {
                    src: 'images/corona-3.jpg'
                },
                {
                    src: 'images/corona-4.jpg'
                },
                
            ],
            dataSources:[
                ['https://www.data.go.kr/tcs/dss/selectDataSetList.do?keyword=%EC%BD%94%EB%A1%9C%EB%82%98&brm=&svcType=&instt=&extsn=&recmSe=N','공공데이터포털 코로나 데이터'],
                ['https://www.worldometers.info/coronavirus/?utm_campaign=homeAdvegas1?','Worldometer COVID-19 Coronavirus Cases'],
                ['https://search.naver.com/search.naver?query=%EC%BD%94%EB%A1%9C%EB%82%98+%ED%99%95%EC%A7%84%EC%9E%90&where=news&ie=utf8&sm=nws_hty','네이버 뉴스 코로나 확진자 검색 결과'],
                ['https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNREZqY0hsNUVnSmxiaWdBUAE/sections/CAQqEAgAKgcICjCcuZcLMI_irgMwwLvMBg?hl=en-US&gl=US&ceid=US%3Aen','구글 뉴스 코로나 정보'],
                ['http://www.cdc.go.kr/gallery.es?mid=a20503020000&bid=0003','질병관리본부 홍보자료']
            ],
            
       }
    },
    created(){
        this.youtubeSearch()
    },
    watch:{
        koreaTotalData(newValue, oldValue){
            this.getKoreaTotal()
        },
        worldTotalData(){
            this.getWorldTotal()
        },
        
    },
    methods:{
        getWorldTotal(){

            const todayWorld = this.worldTotalData[1]
            
            const worldTotal = {
                totalConfirmed : todayWorld.confirmed ,
                totalDeaths : todayWorld.deaths,
                totalCritical: (todayWorld.deaths / todayWorld.confirmed * 100 ).toFixed(1),
            }

            for(let el in worldTotal){
                worldTotal[el] = this.numberCommas(worldTotal[el])
            }

            this.todayWorldTotal = worldTotal
        },
        getKoreaTotal(){
            let { confirmed, deaths } = this.koreaTotalData

            confirmed = confirmed.slice(confirmed.length-2)
            deaths = deaths.slice(deaths.length-2)

            const koreaTotal = {
                totalConfirmed : confirmed[1],
                totalDeaths : deaths[1],
            }

            for(let el in koreaTotal){
                koreaTotal[el] = this.numberCommas(koreaTotal[el])
            }

            this.todayKoreaTotal = koreaTotal
        },
        async youtubeSearch(){
            try{
                const { 
                    data : { items }
                } = await axios.get('/covid/youtube')
   
                this.youtubeList = items
                
            }catch(e){
                console.error(e)
            }
        },
        numberCommas(input){
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        decodeHtmlEntity(text){
            const textArea = document.createElement('textarea');
            textArea.innerHTML = text;
            return textArea.value;
        }
    }
}
</script>

<style scoped>
.col p.number {
    font-size: 22px;
    font-weight: 500;
}

.col .covid {
    color: red;
}

.col .recovered {
    color: rgb(34, 182, 23);
}

</style>