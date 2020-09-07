<template>
    
        <v-container  > 
            <!-- <v-btn color="success" @click="$router.push('/home')">home</v-btn>
            <v-btn color="#2196F3" @click="$router.push('/signup')">회원가입</v-btn>
            <v-btn color="warning" @click="$router.push('/login')">로그인</v-btn>
            <v-btn @click="$router.push('/nav')">테스트</v-btn>
            <v-btn @click="$router.push('/postForm')">에디터</v-btn>
            <v-btn @click="$router.push('/postList')">게시판</v-btn> -->
            <v-btn @click="$router.push('/chartjs')">뷰차트 테스트</v-btn>
            <v-row>
                <v-col>

                    <v-card>
                        <v-card-title>
                            <h2><span class="title mb-1">국내</span></h2>
                        </v-card-title>
                        
                        <v-list-item  >
                            
                            <v-list-item-content class="justify-center">
                                <v-card-title >확진</v-card-title>
                                <v-card-text><h2>{{koreaTotal.TotalConfirmed}}</h2></v-card-text>
                            </v-list-item-content >
                            <v-list-item-content class="justify-center">
                                <v-card-title >완치</v-card-title>
                                <v-card-text><h2>{{koreaTotal.TotalRecovered}}</h2></v-card-text>
                                
                            </v-list-item-content >
                            <v-list-item-content class="justify-center">
                                <v-card-title >사망</v-card-title>
                                <v-card-text><h2>{{koreaTotal.TotalDeaths}}</h2></v-card-text>
                                
                            </v-list-item-content >
                        </v-list-item>
                    </v-card>
                </v-col>
                <v-col >
                    <v-card>
                        <v-card-title>
                            <h2><span class="title mb-1">해외</span></h2>
                        </v-card-title>
                        <v-list-item >
                            
                            <v-list-item-content class="justify-center">
                                <v-card-title >확진</v-card-title>
                                <v-card-text><h2>{{worldTotal.TotalConfirmed}}</h2></v-card-text>
                            </v-list-item-content >
                            <v-list-item-content class="justify-center">
                                <v-card-title >완치</v-card-title>
                                <v-card-text><h2>{{worldTotal.TotalRecovered}}</h2></v-card-text>
                                
                            </v-list-item-content >
                            <v-list-item-content class="justify-center">
                                <v-card-title >사망</v-card-title>
                                <v-card-text><h2>{{worldTotal.TotalDeaths}}</h2></v-card-text>
                                
                            </v-list-item-content >
                        </v-list-item>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <v-card>
                        <h3>국내 확진자수 증가추이</h3>
                        
                        <line-chart 
                        v-if="loaded"
                        :chart-data="koreaChartData"
                        >
                        </line-chart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-card>
                        <h3>도시별 확진자 현황</h3>
                        <bar-chart
                        :chart-data="koreaCityChartData"
                        v-if="cityChartLoaded">
                        </bar-chart>
                        
                    </v-card>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols="12" xs="12" md="6" >
                    <v-card>
                        <v-card-title>
                            <h2><span class="title mb-4">국내 주요 뉴우스</span></h2>
                        </v-card-title>
                        <v-card-text v-for="news in naverNews" :key="news">
                            <h4>
                                <a :href="news.href" style="text-decoration:none; color:#2d46c4" target="_blank">{{news.title}}</a>
                            </h4>
                        </v-card-text>
                        
                    </v-card>
                </v-col>

                <v-col cols="12" xs="12" md="6" >
                    <v-card>
                        <v-card-title>
                            <h2><span class="title mb-4">해외 주요 뉴우스</span></h2>
                        </v-card-title>
                        <v-card-text v-for="news in googleNews" :key="news">
                            <h4>
                                <a :href="news.href" style="text-decoration:none; color:#2d46c4" target="_blank">{{news.title}}</a>
                            </h4>
                        </v-card-text>
                        
                    </v-card>
                </v-col>
            </v-row>

            <v-row justify="center">
                <v-col cols="12" sm="12" md="8">
                    <v-card>
                        <h3>국내 발병 지도</h3>
                        <GChart
                            type="GeoChart"
                            :settings="{ packages: [ 'geochart'], mapsApiKey : 'AIzaSyDXlL3m7Q99D4ZDHEDntQ5b_uj30bzduqY' }"
                            :data="koreaGeoChartData"
                            :options="koreaGeoChartOptions"
                            
                        />
                        
                    </v-card>
                </v-col>
                <!-- <v-col cols="6">
                    <v-card>
                        <GChart
                            type="GeoChart"
                            :settings="{ packages: [ 'geochart'], mapsApiKey : 'AIzaSyDXlL3m7Q99D4ZDHEDntQ5b_uj30bzduqY' }"
                            :data="worldGeoChartData"
                            :options="worldGeoChartOptions"
                           
                        />
                    </v-card>
                </v-col> -->
            </v-row>


            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <v-card>

                        <h3>국내 확진자 일일 신규 증가추이</h3>
                        
                        <line-chart 
                        v-if="loaded"
                        :chart-data="koreaDailyChartData">
                        </line-chart>

                    </v-card>
                    
                </v-col>
                <v-col cols="12" sm="12" md="6">
                   <v-card>
                        <h3>성별 확진자 현황</h3>
                        <pie-chart
                        :chart-data="koreaGenChartData"
                        v-if="genAgeChartLoaded">
                        </pie-chart>
                   </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="6">
                    <v-card>
                        <h3>연령대별 확진자 현황</h3>
                        <polar-area-chart
                        :chart-data="koreaAgeChartData"
                        v-if="genAgeChartLoaded">
                        </polar-area-chart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    
                    <v-card>
                        <h3>연령대별 치명율 현황</h3>
                        <radar-chart
                        :chart-data="koreaCriticalChartData"
                        v-if="genAgeChartLoaded">
                        </radar-chart>
                    </v-card>
                    
                </v-col>
            </v-row>
            
            
            <!-- <v-row>
                <v-col cols="12"  md="8" lg="9">
                    <v-card >
                        <GChart
                            type="GeoChart"
                            :settings="{ packages: [ 'geochart'], mapsApiKey : 'AIzaSyDXlL3m7Q99D4ZDHEDntQ5b_uj30bzduqY' }"
                            :data="koreaGeoChartData"
                            :options="koreaGeoChartOptions"
                            
                        />
                    </v-card>
                </v-col>
                <v-col cols="12" md="4" lg="3">
                    <v-card >
                        <v-carousel
                            cycle
                            
                            hide-delimiter-background
                            show-arrows-on-hover
                            height="auto"
                        >
                            <v-carousel-item
                            v-for="slide in slides"
                            :key="slide"
                            
                        
                            >
                           
                            <v-img :src="slide.src" contain />
                               
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
                
            </v-row> -->
            <v-row>
                <v-col>
                    
                    <v-card>
                        <h3>전세계 확진 발병 지도</h3>
                        <GChart
                            type="GeoChart"
                            :settings="{ packages: [ 'geochart'], mapsApiKey : 'AIzaSyDXlL3m7Q99D4ZDHEDntQ5b_uj30bzduqY' }"
                            :data="worldGeoChartData"
                            :options="worldGeoChartOptions"
                           
                        />
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="6" >
                    <v-card>
                        <h3>전세계 증가추이</h3>
                        <line-chart
                        :chart-data="worldChartData"
                        v-if="worldChartLoaded">
                        </line-chart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                    <v-card>
                        <h3>국가별 확진 현황</h3>
                        <pie-chart
                        :chart-data="worldCounrtyChartData"
                        v-if="worldCounrtyChartLoaded">
                        </pie-chart>
                    </v-card>
                </v-col>
            </v-row>
            <v-row justify="center">
                 <v-col cols="12" sm="12" md="6">
                    <v-card >
                        <v-carousel
                            cycle
                            
                            hide-delimiter-background
                            show-arrows-on-hover
                            height="auto"
                        >
                            <v-carousel-item
                            v-for="slide in slides"
                            :key="slide"
                            
                        
                            >
                           
                            <v-img :src="slide.src" contain />
                               
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
            </v-row>
            
            <v-row justify="center">
                <v-col cols="8">
                    <v-card>
                        <h3>전염병 통계 비교</h3>
                        <v-simple-table>
                            <thead>
                                <tr>
                                    <th>병명</th>
                                    <th>코로나 19</th>
                                    <th>MERS</th>
                                    <th>SARS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>발생연도</td>
                                    <td>2019</td>
                                    <td>2012</td>
                                    <td>2003</td>
                                </tr>
                                <tr>
                                    <td>확진자</td>
                                    <td>{{worldTotal.TotalConfirmed}}</td>
                                    <td>2,494</td>
                                    <td>8,096</td>
                                </tr>
                                <tr>
                                    <td>사망자</td>
                                    <td>{{worldTotal.TotalDeaths}}</td>
                                    <td>858</td>
                                    <td>774</td>
                                </tr>
                                <tr>
                                    <td>치명율</td>
                                    <td>{{worldTotal.TotalCritical}}%</td>
                                    <td>약 10%</td>
                                    <td>약 35%</td>
                                </tr>
                                <tr>
                                    <td>영향국가</td>
                                    <td>214</td>
                                    <td>27</td>
                                    <td>26</td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </v-card>
                </v-col>
               
            </v-row>
        </v-container>
        
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'
import { GChart } from 'vue-google-charts'
import PolarAreaChart from '@/components/PolarAreaChart'
import RadarChart from '@/components/RadarChart'

export default {
    components:{
        LineChart,
        BarChart,
        GChart,
        PieChart,
        PolarAreaChart,
        RadarChart,
    },
    data(){
        return {
            worldTotal:{},
            koreaTotal:{},
            koreaTotalChartData: null,
            koreaDailyChartData:null,
            koreaGenChartData:null,
            koreaAgeChartData:null,
            koreaCriticalChartData:null,
            koreaCityChartData:null,
            worldChartData:null,
            loaded:false,
            naverNews:'',
            googleNews:'',
            genAgeChartLoaded:false,
            cityChartLoaded:false,
            worldChartLoaded:false,
            worldCounrtyChartData:null,
            worldCounrtyChartLoaded:false,
            
            koreaGeoChartData: [
               
                ['City', '확진'],
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
                }
            },

            worldGeoChartData:[['Country', '확진'] ],


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
                
            ]

            
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
                console.log(data)
                this.worldChartData  = {
                    labels : data.map(covid => covid.reportDate.substring(5)),
                    datasets:[
                        {
                            label: 'Confirmed',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: data.map(covid => covid.confirmed.total)
                        },
                        {
                            label: 'Deaths',
                            borderColor:'#c70808',
                            backgroundColor:'rgba(199, 8, 8, 0.7)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: data.map(covid => covid.deaths.total)
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
                
                console.log(data)

                let world = data[7]
                
                this.worldTotal = {
                    TotalConfirmed : world.confirmed,
                    TotalDeaths : world.deaths,
                    TotalRecovered : world.recovered,
                    TotalCritical: (this.stringFormat(world.deaths) / this.stringFormat(world.confirmed) * 100 ).toFixed(1)
                }

                data = data.slice(8,223)
                
                data.forEach(covid => {
                    let confirmed = covid.confirmed.replaceAll(/,/g,'')
                    this.worldGeoChartData.push([covid.country, parseInt(confirmed, 10)])
                })
                
                const otherCountryCount = data.slice(10)
                                         .map(covid => this.stringFormat(covid.confirmed))
                                         .reduce((acc,cur) => acc + cur)
                data = data.slice(0,10)

                this.worldCounrtyChartData = {
                    labels: [...(data.map(covid => covid.country)), 'other'],
                    datasets:[
                        {
                            label: 'Confirmed',
                            borderColor:'rgba(255, 255, 255, 0)',
                            backgroundColor:[
                                '#b3290b',
                                '#460bb3',
                                '#4eb30b',
                                '#0babb3',
                                '#b3730b',
                                '#cfc44c',
                                '#cf4cb5',
                                '#6e1427',
                                '#637ed4',
                                '#487564',
                                '#8e9190'

                            ],
                            
                            data: [...(data.map(covid => this.stringFormat(covid.confirmed))), otherCountryCount]
                        }
                    ]
                }
               
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
                console.log(data)
                let dates = data.map(covid => covid.createDt.substring(5,10))
                let confirmed = data.map(covid => covid.decideCnt)
                let recovered = data.map(covid => covid.clearCnt)
                let deaths = data.map(covid => covid.deathCnt)
                this.koreaChartData = {
                    labels: dates,
                    datasets:[
                        {
                            label: 'Confirmed',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: confirmed
                        },
                        {
                            label: 'Recovered',
                            borderColor:'#0ecf4b',                     
                            backgroundColor:'rgba(14, 207, 75, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: recovered
                        },
                        
                        {
                            label: 'Deaths',
                            borderColor:'#c70808',
                            backgroundColor:'rgba(199, 8, 8, 0.7)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: deaths
                        },
                        
                    ]
                }
                
                let dailyConfirmed = confirmed.slice(confirmed.length - 31)
                let dailyDates = dates.slice(dates.length - 30)
                
                for(let i=0; i<30; i++){
                    dailyConfirmed[i] = dailyConfirmed[i+1] - dailyConfirmed[i]
                }
                console.log(dailyConfirmed)
                this.koreaDailyChartData = {
                    labels: dailyDates,
                    datasets:[
                        {
                            label: 'Confirmed',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: dailyConfirmed.slice(0,dailyConfirmed.length-1)
                        }
                    ]
                }

                this.koreaTotal = {
                    TotalConfirmed : this.numberFormat(confirmed[confirmed.length-1]),
                    TotalDeaths : this.numberFormat(deaths[deaths.length-1]),
                    TotalRecovered : this.numberFormat(recovered[recovered.length-1])
                }
                this.loaded = true
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
                console.log(res)
                let data = res.data.response.body.items.item
                let ageData = data.slice(0, 9)
                let genData = data.slice(9, 11)
                
                let age = ageData.map(genAge => genAge.gubun)
               
                this.koreaAgeChartData = {
                    labels: age,
                    datasets:[
                        {
                            label: '확진',
                            borderWidth: 1,
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
                            ],
                            data : ageData.map(genAge => genAge.confCase)
                        }
                    ]
                }





                // this.koreaAgeChartData = {
                //     labels : age,
                //     datasets:[
                //         {
                //             label: '확진자',
                //             borderColor:'#03fcec',
                //             backgroundColor:'rgba(3, 252, 236, 0.2)',
                //             pointBorderColor:'rgba(255, 255, 255, 0)',
                //             borderWidth: 2,
                //             data: ageData.map(genAge => genAge.confCase)
                //         },
                        
                //     ]
                // }

                this.koreaCriticalChartData = {
                    labels : age,
                    datasets:[
                        {
                            label: '치명율 (사망자/확진자)',
                            
                            backgroundColor:'rgba(54, 162, 235, 0.2)',
                            
                            borderWidth: 1,
                            data: ageData.map(genAge => genAge.criticalRate)
                        },
                        
                    ]
                }

                this.koreaGenChartData = {
                    labels : genData.map(genAge => genAge.gubun),
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
                            data: genData.map(genAge => genAge.confCase)
                        },
                    ]
                }
                this.genAgeChartLoaded = true
                console.log(age)
            }catch(e){
                console.error(e)
            }
        },
        async covidCity(){
            try{
                let res = await axios.get('/covid/korea/city')
                let cityData = res.data.response.body.items.item.slice(0, 18)
                console.log(cityData)
                this.koreaCityChartData = {
                    labels: cityData.map(city => city.gubun),
                    datasets:[
                        {
                            label: '확진자',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: cityData.map(city => city.defCnt)
                        }
                    ]
                }
                this.cityChartLoaded = true

                for(let i=1; i<cityData.length; i++){
                    this.koreaGeoChartData[i].push(cityData[i].defCnt)
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
            return parseInt(input.replaceAll(/,/g, ''), 10)
        }
        
            
    }
}
</script>

<style scoped>

</style>
