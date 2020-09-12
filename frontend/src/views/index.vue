<template>
    
        <v-container  > 
            <!-- <v-btn color="success" @click="$router.push('/home')">home</v-btn>
            <v-btn color="#2196F3" @click="$router.push('/signup')">회원가입</v-btn>
            <v-btn color="warning" @click="$router.push('/login')">로그인</v-btn>
            <v-btn @click="$router.push('/nav')">테스트</v-btn>
            <v-btn @click="$router.push('/postForm')">에디터</v-btn>
            <v-btn @click="$router.push('/postList')">게시판</v-btn> -->
            <!-- <v-btn @click="$router.push('/chartjs')">뷰차트 테스트</v-btn> -->
            <v-row justify="center" class="mb-5">
                <v-col cols="12" sm="12" md="8">
                    <v-card>
                        
                        <v-card-title class="justify-center pt-6">
                            <h3>국내 현황</h3>
                        </v-card-title>
                        <v-row>
                            <v-col class="text-center">
                                <p>확진자</p>
                                <p class="number mb-0">{{koreaTotal.totalConfirmed}}</p>
                                <p class="covid">+({{koreaTotal.newConfirmed}})</p>                            
                            </v-col>
                            <v-col class="text-center">
                                <p>사망자</p>
                                <p class="number covid mb-0">{{koreaTotal.totalDeaths}}</p>
                                <p class="covid">+({{koreaTotal.newDeaths}})</p>   
                            </v-col>
                            <v-col class="text-center">
                                <p>치명율</p>
                                <p class="number">{{koreaTotal.totalCritical}}%</p>
                            </v-col>
                            <v-col class="text-center">
                                <p>완치자</p>
                                <p class="number mb-0">{{koreaTotal.totalRecovered}}</p>
                                <p class="recovered">+({{koreaTotal.newRecovered}})</p>   
                            </v-col>
                        </v-row>

                        <v-card-title class="justify-center">
                            <h3>세계 현황</h3>
                        </v-card-title>
                        <v-row>
                            <v-col class="text-center">
                                <p>확진자</p>
                                <p class="number mb-0">{{worldTotal.totalConfirmed}}</p>       
                                <p class="covid">+({{worldTotal.newConfirmed}})</p>                         
                            </v-col>
                            <v-col class="text-center">
                                <p>사망자</p>
                                <p class="number covid mb-0">{{worldTotal.totalDeaths}}</p>
                                <p class="covid">+({{worldTotal.newDeaths}})</p>   
                            </v-col>
                            <v-col class="text-center">
                                <p>치명율</p>
                                <p class="number">{{worldTotal.totalCritical}}%</p>
                            </v-col>
                            <v-col class="text-center">
                                <p>완치자</p>
                                <p class="number mb-0">{{worldTotal.totalRecovered}}</p>
                                <p class="recovered">+({{worldTotal.newRecovered}})</p>   
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <chart-card>
                        <template v-slot:title>
                            국내 확진자 증가추이
                        </template>
                        <template v-slot:body>
                            <line-chart 
                            v-if="koreaDailyTotalLoaded"
                            :chart-data="koreaDailyTotalChartData"
                            :height="500"
                            >
                            </line-chart>
                        </template>
                    </chart-card>
                    
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <chart-card>
                        <template v-slot:title>
                            국내 코로나 발병 지도
                        </template>
                        <template v-slot:body>
                            <GChart
                            type="GeoChart"
                            :settings="{ packages: [ 'geochart'], mapsApiKey : 'AIzaSyDXlL3m7Q99D4ZDHEDntQ5b_uj30bzduqY' }"
                            :data="koreaGeoChartData"
                            :options="koreaGeoChartOptions"
                            
                            />
                        </template>
                    </chart-card>
                   
                </v-col>
            </v-row>

            
            <v-row>
                <v-col cols="12" xs="12" md="6" >
                    <chart-card>
                        <template v-slot:title>
                            국내 주요 뉴스
                        </template>
                        <template v-slot:body>
                            <v-card-text v-for="news in naverNews" :key="news">
                                <h4>
                                    <a :href="news.href" style="text-decoration:none; color:#2d46c4" target="_blank">{{news.title}}</a>
                                </h4>
                            </v-card-text>
                        </template>
                    </chart-card>
                   
                </v-col>

                <v-col cols="12" xs="12" md="6" >
                    <chart-card>
                        <template v-slot:title>
                            해외 주요 뉴스
                        </template>
                        <template v-slot:body>
                            <v-card-text v-for="news in googleNews" :key="news">
                                <h4>
                                    <a :href="news.href" style="text-decoration:none; color:#2d46c4" target="_blank">{{news.title}}</a>
                                </h4>
                            </v-card-text>
                        </template>
                    </chart-card>
                   
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <chart-card>
                        <template v-slot:title>
                            도시별 확진자 현황
                        </template>
                        <template v-slot:body>
                            <bar-chart
                            :chart-data="koreaCityChartData"
                            v-if="cityChartLoaded"
                            >
                            </bar-chart>
                            <v-row justify="center">
                                <v-btn-toggle 
                                borderless 
                                color="rgba(54, 162, 235, 1)" 
                                v-model="koreaCityStatus" 
                                class="mt-2">
                                    <v-btn>
                                        확진자
                                    </v-btn>
                                    <v-btn>
                                        사망자
                                    </v-btn>
                                    <v-btn>
                                        완치자
                                    </v-btn>
                                </v-btn-toggle>
                            </v-row>
                          
                        </template>
                    </chart-card>
                   
                    
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <chart-card>
                        <template v-slot:title>
                            성별 확진자 현황
                        </template>
                        <template v-slot:body>
                            <pie-chart
                            :chart-data="koreaGenChartData"
                            v-if="genAgeChartLoaded">
                            </pie-chart>
                            <v-row justify="center">
                                <v-btn-toggle 
                                borderless 
                                color="rgba(54, 162, 235, 1)" 
                                v-model="koreaGenStatus" 
                                class="mt-2">
                                    <v-btn>
                                        확진자
                                    </v-btn>
                                    <v-btn>
                                        사망자
                                    </v-btn>
                                </v-btn-toggle>
                            </v-row>
                         
                        </template>
                    </chart-card>
                  
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <chart-card :card-height="430">
                        <template v-slot:title>
                            연령대별 확진자 현황
                        </template>
                        <template v-slot:body>
                            <polar-area-chart
                            :chart-data="koreaAgeChartData"
                            v-if="genAgeChartLoaded">
                            </polar-area-chart>
                        </template>
                    </chart-card>
          
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <chart-card :card-height="430">
                        <template v-slot:title>
                            연령대별 치명율 현황
                        </template>
                        <template v-slot:body>
                            <radar-chart
                            :chart-data="koreaAgeCriticalChartData"
                            v-if="genAgeChartLoaded">
                            </radar-chart>
                        </template>
                    </chart-card>
                    
          
                    
                </v-col>
            </v-row>
            
            
            
            
            <v-row>
                <v-col cols="12" sm="12" md="6" >
                    <chart-card>
                        <template v-slot:title>
                            국내 확진자 일일 신규 증가추이
                        </template>
                        <template v-slot:body>
                            <line-chart 
                            v-if="koreaDailyTotalLoaded"
                            :chart-data="koreaDailyChartData">
                            </line-chart>
                        </template>
                    </chart-card>
                
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <chart-card>
                        <template v-slot:title>
                            전세계 확진자 증가추이
                        </template>
                        <template v-slot:body>
                            <line-chart
                            :chart-data="worldDailyTotalChartData"
                            v-if="worldChartLoaded">
                            </line-chart>
                        </template>
                    </chart-card>
               
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <chart-card>
                        <template v-slot:title>
                            전세계 코로나 발병 지도
                        </template>
                        <template v-slot:body>
                            <GChart
                            type="GeoChart"
                            :settings="{ packages: [ 'geochart'], mapsApiKey : 'AIzaSyDXlL3m7Q99D4ZDHEDntQ5b_uj30bzduqY' }"
                            :data="worldGeoChartData"
                            :options="worldGeoChartOptions"
                            />
                        </template>
                    </chart-card>
                  
                </v-col>
            </v-row>

            <v-row >
                
                <v-col>
                    <chart-card>
                        <template v-slot:title>
                            국가별 발생 분포
                        </template>
                        <template v-slot:body>
                            <pie-chart
                            :chart-data="worldCounrtyChartData"
                            v-if="worldCounrtyChartLoaded">
                            </pie-chart>
                            <v-row justify="center">
                                <v-btn-toggle 
                                borderless 
                                color="rgba(54, 162, 235, 1)" 
                                v-model="worldCountryStatus" 
                                class="mt-2">
                                    <v-btn>
                                        확진자
                                    </v-btn>
                                    <v-btn>
                                        사망자
                                    </v-btn>
                                    <v-btn>
                                        완치자
                                    </v-btn>
                                </v-btn-toggle>
                            </v-row>
                           
                        </template>
                    </chart-card>
                
                </v-col>
                <v-col >
                    <v-card >
                        <chart-card >
                            <template v-slot:title>
                                전염병 통계 비교
                            </template>
                            <template v-slot:body>
                                <v-simple-table class="mt-5 mb-13" >
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
                                            <td class="covid">{{worldTotal.totalConfirmed}}</td>
                                            <td>2,494</td>
                                            <td>8,096</td>
                                        </tr>
                                        <tr>
                                            <td>한국 확진자</td>
                                            <td class="covid">{{koreaTotal.totalConfirmed}}</td>
                                            <td>186</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>사망자</td>
                                            <td class="covid">{{worldTotal.totalDeaths}}</td>
                                            <td>858</td>
                                            <td>774</td>
                                        </tr>
                                        <tr>
                                            <td>한국 사망자</td>
                                            <td class="covid">{{koreaTotal.totalDeaths}}</td>
                                            <td>38</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>치명율</td>
                                            <td class="covid">{{worldTotal.totalCritical}}%</td>
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
            
            <v-row  >
                 <v-col cols="12" sm="12" md="6">
                        <chart-card>
                            <template v-slot:title>
                                예방 행동 수칙
                            </template>
                            <template v-slot:body>
                                <v-carousel
                                cycle
                                hide-delimiter-background
                                show-arrows-on-hover
                                height="800"
                                style="margin: 10px 0 10px"
                                >
                                    <v-carousel-item
                                    v-for="slide in slides"
                                    :key="slide"
                                    >
                                
                                    <v-img :src="slide.src" 
                                    max-height="800" 
                                    contain/>
                                    
                                    </v-carousel-item>
                                </v-carousel>
                            </template>
                        </chart-card>
                       
                        
                    
                </v-col>
            </v-row>
            
        
            
            
        </v-container>
        
</template>

<script>
import ChartCard from '@/components/ChartCard'
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'
import { GChart } from 'vue-google-charts'
import PolarAreaChart from '@/components/PolarAreaChart'
import RadarChart from '@/components/RadarChart'
import Reactive from '@/components/Reactive'
export default {
    components:{
        LineChart,
        BarChart,
        GChart,
        PieChart,
        PolarAreaChart,
        RadarChart,
        Reactive,
        ChartCard
    },
    data(){
        return {
            

            worldTotal:{},
            koreaTotal:{},
            koreaTotalChartData: null,
            koreaDailyChartData:null,
            
            koreaAgeChartData:null,
            koreaAgeCriticalChartData:null,
            
            worldDailyTotalChartData:null,
            koreaDailyTotalLoaded:false,
            naverNews:'',
            googleNews:'',
            genAgeChartLoaded:false,
            cityChartLoaded:false,
            worldChartLoaded:false,


            // worldCounrtyChartData:null,
            worldCounrtyChartLoaded:false,
            
            worldCountryData:[],
            worldCountryStatus: 0,

            //koreaGenChartData:null,
            koreaGenData:[],
            koreaGenStatus: 0,

            //koreaCityChartData:null,
            koreaCityData:[],
            koreaCityStatus: 0,

            koreaGeoChartData: [
               
                ['City', '확진', '사망'],
                [{v:'KR-49',f:'제주'}],
                [{v:'KR-48',f:'경남'}],
                [{v:'KR-47',f:'경북'}],
                [{v:'KR-46',f:'전남'}],
                [{v:'KR-45',f:'전북'}],
                [{v:'KR-44',f:'충남'}],
                [{v:'KR-43',f:'충북'}],
                [{v:'KR-42',f:'강원'}],
                [{v:'KR-41',f:'경기'}],
                [{v:'KR-50',f:'세종'}],
                [{v:'KR-31',f:'울산'}],
                [{v:'KR-30',f:'대전'}],
                [{v:'KR-29',f:'광주'}],
                [{v:'KR-28',f:'인천'}],
                [{v:'KR-27',f:'대구'}],
                [{v:'KR-26',f:'부산'}],
                [{v:'KR-11',f:'서울'}],
                
            ],
            koreaGeoChartOptions: {
                region: 'KR',
                resolution: 'provinces',
                colorAxis:{
                    minValue: 0,  colors: ['#fffcfc', '#b00b0b']
                },
                height:500
            },

            worldGeoChartData:[['Country', '확진', '사망'] ],

            
            worldGeoChartOptions:{
                resolution: 'countries',
                colorAxis:{
                    minValue: 0,  colors: ['#fffcfc', '#b00b0b']
                }
            },
            slides:[
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
            borderColor:[
                'rgba(240, 12, 12, 1)',
                'rgba(237, 226, 14, 1)',
                'rgba(29, 237, 14, 1)',
                'rgba(237, 159, 14, 1)',
                'rgba(14, 237, 237, 1)',
                'rgba(14, 44, 237, 1)',
                'rgba(189, 235, 52, 1)',
                'rgba(171, 50, 165, 1)',
                'rgba(91, 168, 35, 1)',
                'rgba(222, 50, 31, 1)',
                'rgba(102, 102, 102, 1)',
                'rgba(78, 179, 11, 1)',
                'rgba(11, 171, 179, 1)',
                'rgba(179, 115, 11, 1)',
                'rgba(207, 196, 76, 1)',
                'rgba(207, 76, 181, 1)',
                'rgba(110, 20, 39, 1)',
                'rgba(99, 126, 212, 1)',
                'rgba(72, 117, 100, 1)',
                'rgba(142, 145, 144, 1)'
            ],
            backgroundColor:[
                'rgba(240, 12, 12, 0.2)',
                'rgba(237, 226, 14, 0.2)',
                'rgba(29, 237, 14, 0.2)',
                'rgba(237, 159, 14, 0.2)',
                'rgba(14, 237, 237, 0.2)',
                'rgba(14, 44, 237, 0.2)',
                'rgba(189, 235, 52, 0.2)',
                'rgba(171, 50, 165, 0.2)',
                'rgba(91, 168, 35, 0.2)',
                'rgba(222, 50, 31, 0.2)',
                'rgba(102, 102, 102, 0.2)',
                'rgba(78, 179, 11, 0.2)',
                'rgba(11, 171, 179, 0.2)',
                'rgba(179, 115, 11, 0.2)',
                'rgba(207, 196, 76, 0.2)',
                'rgba(207, 76, 181, 0.2)',
                'rgba(110, 20, 39, 0.2)',
                'rgba(99, 126, 212, 0.2)',
                'rgba(72, 117, 100, 0.2)',
                'rgba(142, 145, 144, 0.2)'
            ],

            
        }
    },
    computed : {
        worldCounrtyChartData(){
            return this.worldCountryData[this.worldCountryStatus]
        },
        koreaCityChartData(){
            return this.koreaCityData[this.koreaCityStatus]
        },
        koreaGenChartData(){
            return this.koreaGenData[this.koreaGenStatus]
        }
    },

    created(){
        this.getWorldDailyTotal()
        this.getKoreaDailyTotal()

        this.googleCrawling()
        this.naverCrawling()

        this.covidGenAge();
        this.covidCity();

        this.getCountryTotal()
        
       
    },
    methods:{
       
        async getWorldDailyTotal(){
            try{
                let { data } = await axios.get('/covid/world/daily')
                
                this.worldDailyTotalChartData  = {
                    labels : data.map(covid => covid.reportDate.substring(5)),
                    datasets:[
                        {
                            label: '확진자',
                            borderColor:'rgba(54, 162, 235, 1)',
                            backgroundColor:'rgba(54, 162, 235, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: data.map(covid => covid.confirmed.total)
                        }
                    ]
                }
                
                this.worldChartLoaded = true
            }catch(e){
                console.error(e)
            }
        },
        async getCountryTotal(){
            try{
                let { data } = await axios.get('/covid/world')
                
                data = data.map(covid => {
                    return {
                        confirmed : this.stringFormat(covid.confirmed),
                        recovered : this.stringFormat(covid.recovered),
                        deaths : this.stringFormat(covid.deaths),
                        country : covid.country
                    }
                })
                
                const yesterdayWorld = data[0]
                const todayWorld = data[1]
                console.log(data)
                this.worldTotal = {
                    totalConfirmed : this.numberFormat(todayWorld.confirmed) ,
                    totalDeaths : this.numberFormat(todayWorld.deaths),
                    totalRecovered : this.numberFormat(todayWorld.recovered),
                    totalCritical: (todayWorld.deaths / todayWorld.confirmed * 100 ).toFixed(1),
                    newConfirmed : this.numberFormat(todayWorld.confirmed - yesterdayWorld.confirmed),
                    newDeaths: this.numberFormat(todayWorld.deaths - yesterdayWorld.deaths),
                    newRecovered : this.numberFormat(todayWorld.recovered - yesterdayWorld.recovered)

                }

                data = data.slice(2, 217)
               
            
                const countryData = data.map(covid => [covid.country, covid.confirmed, covid.deaths] )
                
                this.worldGeoChartData = [['Country','확진','사망']].concat(countryData)


                const conf = this.countryStatusSortData(data, 'confirmed')
                const deaths = this.countryStatusSortData(data, 'deaths')
                const recovered = this.countryStatusSortData(data, 'recovered')

                this.worldCountryData = [
                    {
                        labels: [...(conf.data.map(covid => covid.country)), '기타'],
                        datasets:[
                            {
                                label: '확진자',
                                borderColor: this.borderColor,
                                backgroundColor : this.backgroundColor,
                                data: [...(conf.data.map(covid => covid.confirmed)), conf.otherCountryCount]
                            }
                        ]
                    },
                    {
                        labels: [...(deaths.data.map(covid => covid.country)), '기타'],
                        datasets:[
                            {
                                label: '사망자',
                                borderColor: this.borderColor,
                                backgroundColor : this.backgroundColor,
                                data: [...(deaths.data.map(covid => covid.deaths)), deaths.otherCountryCount]
                            }
                        ]
                    },
                    {
                        labels: [...(recovered.data.map(covid => covid.country)), '기타'],
                        datasets:[
                            {
                                label: '완치자',
                                borderColor: this.borderColor,
                                backgroundColor : this.backgroundColor,
                                data: [...(recovered.data.map(covid => covid.recovered)), recovered.otherCountryCount]
                            }
                        ]
                    },

                ]

                this.worldCounrtyChartData = this.worldCountryData[0]
               
                this.worldCounrtyChartLoaded = true

            }catch(e){
                console.error(e)
            }
        },
        async getKoreaDailyTotal(){
            try{
                let { data } = await axios.get('/covid/korea/day')
                
                data = data.response.body.items.item.reverse()
                data.splice(116, 2)
                
                let dates = data.map(covid => covid.createDt.substring(5,10))
                let confirmed = data.map(covid => covid.decideCnt)
                let recovered = data.map(covid => covid.clearCnt)
                let deaths = data.map(covid => covid.deathCnt)

                this.koreaTotal = {
                    totalConfirmed : this.numberFormat(confirmed[confirmed.length-1]),
                    totalDeaths : this.numberFormat(deaths[deaths.length-1]),
                    totalRecovered : this.numberFormat(recovered[recovered.length-1]),
                    totalCritical: this.numberFormat((deaths[deaths.length-1] / confirmed[confirmed.length-1] * 100).toFixed(1)),
                    newConfirmed : this.numberFormat(confirmed[confirmed.length-1] - confirmed[confirmed.length-2]),
                    newDeaths : this.numberFormat(deaths[deaths.length-1] - deaths[deaths.length-2]),
                    newRecovered : this.numberFormat(recovered[recovered.length-1] - recovered[recovered.length-2])
                }

                this.koreaDailyTotalChartData = {
                    labels: dates,
                    datasets:[
                        {
                            label: '확진자',
                            borderColor:'rgba(54, 162, 235, 1)',
                            backgroundColor:'rgba(54, 162, 235, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: confirmed
                        },
                        {
                            label: '완치자',
                            borderColor:'rgba(29, 237, 14, 1)',                     
                            backgroundColor:'rgba(29, 237, 14, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: recovered
                        },
                        
                        {
                            label: '사망자',
                            borderColor:'rgba(219, 47, 35, 1)',
                            backgroundColor:'rgba(219, 47, 35, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: deaths
                        },
                        
                    ]
                }
                
                let dailyNewConfirmed = confirmed.slice(confirmed.length - 31)
                let dailyNewDates = dates.slice(dates.length - 30)
                
                for(let i=0; i<30; i++){
                    dailyNewConfirmed[i] = dailyNewConfirmed[i+1] - dailyNewConfirmed[i]
                }
                this.koreaDailyChartData = {
                    labels: dailyNewDates,
                    datasets:[
                        {
                            label: '확진자',
                            borderColor:'rgba(54, 162, 235, 1)',
                            backgroundColor:'rgba(54, 162, 235, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: dailyNewConfirmed.slice(0, dailyNewConfirmed.length-1)
                        }
                    ]
                }

                
                this.koreaDailyTotalLoaded = true
            }catch(e){
                console.error(e)
            }
        },
        async naverCrawling(){
            try{
                let { data } = await axios.get('/covid/news/naver')
                this.naverNews = data
            }catch(e){
                console.error(e)
            }
        },
        async googleCrawling(){
            try{
                let { data } = await axios.get('/covid/news/google')
                this.googleNews = data
            }catch(e){
                console.error(e)
            }
        },
        async covidGenAge(){
            try{
                let res = await axios.get('/covid/korea/genAge')
                
                let data = res.data.response.body.items.item
                let ageData = data.slice(0, 9)
                let genData = data.slice(9, 11)
                
                let age = ageData.map(covid => covid.gubun)
               
                this.koreaAgeChartData = {
                    labels: age,
                    datasets:[
                        {
                            label: '확진자',
                            borderWidth: 1,
                            backgroundColor: this.backgroundColor,
                            borderColor: this.borderColor,
                            data : ageData.map(covid => covid.confCase)
                        }
                    ]
                }


                this.koreaAgeCriticalChartData = {
                    labels : age,
                    datasets:[
                        {
                            label: '치명율 (사망자/확진자)',
                            
                            backgroundColor:'rgba(54, 162, 235, 0.2)',
                            
                            borderWidth: 1,
                            data: ageData.map(covid => covid.criticalRate)
                        },
                        
                    ]
                }


                let gen  = genData.map(covid => covid.gubun)
                console.log(genData)
                

                this.koreaGenData = [
                    {
                        labels : gen,
                        datasets: [
                            {
                                label: '확진자',
                                borderColor:[
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                ],
                                backgroundColor:[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                ],
                                
                                borderWidth: 2,
                                data: genData.map(covid => covid.confCase)
                            },
                        ]
                    },
                    {
                        labels : gen,
                        datasets: [
                            {
                                label: '사망자',
                                borderColor:[
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                ],
                                backgroundColor:[
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                ],
                                
                                borderWidth: 2,
                                data: genData.map(covid => covid.death)
                            },
                        ]
                    },

                ]

                //this.koreaGenChartData = this.koreaGenData[0]

                this.genAgeChartLoaded = true
            }catch(e){
                console.error(e)
            }
        },
        async covidCity(){
            try{
                let res = await axios.get('/covid/korea/city')
                let cityData = res.data.response.body.items.item.slice(0, 18)
                console.log(cityData)
                let cityNames = cityData.map(city => city.gubun)
                

                this.koreaCityData = [
                    {
                        labels: cityNames,
                        datasets:[
                            {
                                label: '확진자',
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                
                                borderWidth: 2,
                                data: cityData.map(city => city.defCnt)
                            }
                        ]
                    },
                    {
                        labels: cityNames,
                        datasets:[
                            {
                                label: '사망자',
                                borderColor: 'rgba(219, 47, 35, 1)',
                                backgroundColor: 'rgba(219, 47, 35, 0.2)',
                                
                                borderWidth: 2,
                                data: cityData.map(city => city.deathCnt)
                            }
                        ]
                    },
                    {
                        labels: cityNames,
                        datasets:[
                            {
                                label: '완치자',
                                borderColor: 'rgba(29, 237, 14, 1)',
                                backgroundColor: 'rgba(29, 237, 14, 0.2)',
                                
                                borderWidth: 2,
                                data: cityData.map(city => city.isolClearCnt)
                            }
                        ]
                    },
                ]



                //this.koreaCityChartData = this.koreaCityData[0]

                this.cityChartLoaded = true




                for(let i=1; i<cityData.length; i++){
                    this.koreaGeoChartData[i].push(cityData[i].defCnt, cityData[i].deathCnt)
                }
                this.koreaGeoChartLoaded = true

            }catch(e){
                console.error(e)
            }
        },
        numberFormat(input){
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        stringFormat(input){
            return input && input != "N/A" ? parseInt(input.replaceAll(/,/g, ''), 10) : 0
        },
        countryStatusSortData(data, status){

                let mapped = data.map((covid, i) => { 
                        return { i, value : covid[`${status}`] }
                    })

                mapped.sort((a,b) => b.value - a.value)
                let sortData = mapped.map(el => data[el.i])
                
                const otherCountryCount = sortData.slice(10)
                                         .map(covid => covid[`${status}`])
                                         .reduce((acc,cur) => acc + cur)

                return {
                    otherCountryCount,
                    data : sortData.slice(0,10)
                }
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
