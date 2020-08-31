<template>
    
        <v-container fluid > 
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
                <v-col >
                    <v-card>
                        <h3>국내 확진자수 증가추이</h3>
                        <v-switch label="test"></v-switch>
                        <line-chart 
                        v-if="loaded"
                        :chart-data="koreaChartData">
                        </line-chart>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card>
                        <h3>국내 확진자 일일 신규</h3>
                        <v-switch label="test"></v-switch>
                        <line-chart 
                        v-if="loaded"
                        :chart-data="koreaDailyChartData">
                        </line-chart>
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
            <v-row>
                <v-col>
                    <v-card>
                        <h3>연령대별 확진자 현황</h3>
                        <bar-chart
                        :chart-data="koreaAgeChartData"
                        v-if="genAgeChartLoaded">
                        </bar-chart>
                    </v-card>
                    <v-card>
                        <h3>연령대별 치명율 현황</h3>
                        <bar-chart
                        :chart-data="koreaCriticalChartData"
                        v-if="genAgeChartLoaded">
                        </bar-chart>
                    </v-card>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col>
                    <v-card>
                        <h3>성별 확진자 현황</h3>
                        <bar-chart
                        :chart-data="koreaGenChartData"
                        v-if="genAgeChartLoaded">
                        </bar-chart>
                    </v-card>
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
                <v-col>
                    <v-card>
                        <GChart
                            type="ColumnChart"
                            :data="chartData"
                            :options="chartOptions"
                        />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import { GChart } from 'vue-google-charts'

export default {
    components:{
        LineChart,
        BarChart,
        GChart,
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
            loaded:false,
            naverNews:'',
            googleNews:'',
            genAgeChartLoaded:false,
            cityChartLoaded:false,

            chartData: [
                ['Year', 'Sales', 'Expenses', 'Profit'],
                ['2014', 1000, 400, 200],
                ['2015', 1170, 460, 250],
                ['2016', 660, 1120, 300],
                ['2017', 1030, 540, 350]

                
            ],
            chartOptions: {
                chart: {
                title: 'Company Performance',
                subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                }
            }

            
        }
    },
    created(){
        this.getWorldTotal()
        this.corona()
        this.googleCrawling()
        
        this.naverCrawling()
        this.covidGenAge();
        this.covidCity();
    },
    methods:{
        getWorldTotal(){
            axios.get('https://api.covid19api.com/world/total')
            .then(({data})=>{
                this.worldTotal = {
                    TotalConfirmed : this.numberFormat(data.TotalConfirmed),
                    TotalDeaths : this.numberFormat(data.TotalDeaths),
                    TotalRecovered : this.numberFormat(data.TotalRecovered)
                }
            })
            .catch(err=>{
                console.error(err)
            })
        },
        async corona(){
            try{
                let { data } = await axios.get('https://api.covid19api.com/total/country/south-korea')
                console.log(data)
                let dates = data.map(covid => covid.Date.substring(5,10))
                let confirmed = data.map(covid => covid.Confirmed)
                let recovered = data.map(covid => covid.Recovered)
                let deaths = data.map(covid => covid.Deaths)
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
                let { data } = await axios.get('/covid/naverCrawling')
                this.naverNews = data
            }catch(e){
                console.error(e)
            }
        },
        async googleCrawling(){
            try{
                let { data } = await axios.get('/covid/googleCrawling')
                this.googleNews = data
            }catch(e){
                console.error(e)
            }
        },
        async covidGenAge(){
            try{
                let res = await axios.get('/covid/case',{
                    params: {
                        serviceCase : 'genAge'
                    }
                })
                console.log(res)
                let data = res.data.response.body.items.item
                let ageData = data.slice(0, 9)
                let genData = data.slice(9, 11)
                
                let age = ageData.map(genAge => genAge.gubun)
               
                this.koreaAgeChartData = {
                    labels : age,
                    datasets:[
                        {
                            label: '확진자',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: ageData.map(genAge => genAge.confCase)
                        },
                        
                    ]
                }

                this.koreaCriticalChartData = {
                    labels : age,
                    datasets:[
                        {
                            label: '치명율 (사망자/확진자)',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: ageData.map(genAge => genAge.criticalRate)
                        },
                        
                    ]
                }

                this.koreaGenChartData = {
                    labels : genData.map(genAge => genAge.gubun),
                    datasets: [
                        {
                            label: '확진자',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
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
                let res = await axios.get('/covid/case',{
                    params:{
                        serviceCase : 'city'
                    }
                })
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

            }catch(e){
                console.error(e)
            }
        },
        numberFormat(input){
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        
            
    }
}
</script>

<style scoped>

</style>
