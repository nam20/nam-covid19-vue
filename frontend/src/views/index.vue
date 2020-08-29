<template>
    <v-container>
        <v-btn color="success" @click="$router.push('/home')">home</v-btn>
        <v-btn color="#2196F3" @click="$router.push('/signup')">회원가입</v-btn>
        <v-btn color="warning" @click="$router.push('/login')">로그인</v-btn>
        <v-btn @click="$router.push('/nav')">테스트</v-btn>
        <v-btn @click="$router.push('/postForm')">에디터</v-btn>
        <v-btn @click="$router.push('/postList')">게시판</v-btn>
        <v-btn @click="$router.push('/chartjs')">뷰차트 테스트</v-btn>
        
        <v-col cols="12">
            <v-card
                class="mx-auto"
                max-width="344"
                outlined
                v-if="worldTotal"
            >
               
                <v-list-item three-line >
                    <v-list-item-content class="d-flex justify-center">
                        <v-btn text>확진</v-btn>
                        <v-btn text>{{worldTotal.TotalConfirmed}}</v-btn>
                    </v-list-item-content >
                    <v-list-item-content class="d-flex justify-center">
                        <v-btn text>완치</v-btn>
                        <v-btn text>{{worldTotal.TotalRecovered}}</v-btn>
                    </v-list-item-content >
                    <v-list-item-content class="d-flex justify-center">
                        <v-btn text>사망</v-btn>
                        <v-btn text>{{worldTotal.TotalDeaths}}</v-btn>
                    </v-list-item-content >
                </v-list-item>
              
            </v-card>
        </v-col>

        <v-col>
            <v-card>
                <h3>Line Chart</h3>
                <v-switch label="test"></v-switch>
                <line-chart 
                v-if="loaded"
                :chart-data="datacollection">
                </line-chart>
            </v-card>
        </v-col>
        <v-col>
            <v-card
            class="mx-auto">
                <v-card-title>
                    <span class="title mb-4">국내 주요 뉴우스</span>
                </v-card-title>
                <v-card-text v-for="news in naverNews" :key="news">
                    <h3>
                        <a :href="news.href" style="text-decoration:none; ">{{news.title}}</a>
                    </h3>
                    
                </v-card-text>
                <!-- <v-list-item>
                    
                    <v-list-item-content >
                        <v-list-item-title>
                            <span class="title">국내 주요 뉴우스</span>
                        </v-list-item-title>
                        <h3 v-for="news in naverNews" :key="news">
                            <a href="" style="text-decoration:none; ">{{news.title}}</a>
                        </h3>
                    </v-list-item-content>
                </v-list-item> -->
            </v-card>
        </v-col>
    </v-container>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
    components:{
        LineChart
    },
    data(){
        return {
            worldTotal:{},
            koreaTotal:{},
            datacollection: null,
            loaded:false,
            naverNews:''
        }
    },
    created(){
        this.getWorldTotal()
        this.corona()
        this.naverCrawling()
    },
    methods:{
        getWorldTotal(){
            axios.get('https://api.covid19api.com/world/total')
            .then(({data})=>{
                this.worldTotal = data
                console.log(data)
            })
            .catch(err=>{
                console.error(err)
            })
        },
        async corona(){
            try{
                let { data } = await axios.get('https://api.covid19api.com/total/country/south-korea')
                console.log(data)
                
                this.datacollection = {
                    labels: data.map(covid => covid.Date.substring(5,10)),
                    datasets:[
                        {
                            label: 'Confirmed',
                            borderColor:'#03fcec',
                            backgroundColor:'rgba(3, 252, 236, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: data.map(covid => covid.Confirmed)
                        },
                        {
                            label: 'Recovered',
                            borderColor:'#0ecf4b',                     
                            backgroundColor:'rgba(14, 207, 75, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: data.map(covid => covid.Recovered)
                        },
                        
                        {
                            label: 'Deaths',
                            borderColor:'#c70808',
                            backgroundColor:'rgba(199, 8, 8, 0.7)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            borderWidth: 2,
                            data: data.map(covid => covid.Deaths)
                        },
                        
                    ]
                }
                this.loaded = true

            }catch(e){
                console.error(e)
            }
        },
        naverCrawling(){
            axios.get('/user/naverCrawling')
            .then(({data})=>{
                console.log(data)
                this.naverNews = data
            })
            .catch(e=>{
                console.error(e)
            })
        }
            
    }
}
</script>

<style scoped>

</style>
