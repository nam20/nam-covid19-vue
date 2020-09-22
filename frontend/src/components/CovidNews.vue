<template>
    <v-row id="worldKoreaNews">
        <v-col cols="12" xs="12" md="6" >
            <chart-card>
                <template v-slot:title>
                    국내 주요 뉴스
                </template>
                <template v-slot:body>
                    <v-simple-table >
                        <tbody>
                            <tr v-for="news in naverNews" :key="news">
                                <td>
                                    <h4>
                                        <a :href="news.href" class="text-decoration-none" style="color:#2d46c4" target="_blank">{{news.title}}</a>
                                    </h4>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                </template>
            </chart-card>
            
        </v-col>

        <v-col cols="12" xs="12" md="6" >
            <chart-card>
                <template v-slot:title>
                    해외 주요 뉴스
                </template>
                <template v-slot:body>
                    <v-simple-table>
                        <tbody>
                            <tr v-for="news in googleNews" :key="news">
                                <td>
                                    <h4>
                                        <a :href="news.href" class="text-decoration-none" style="color:#2d46c4" target="_blank">{{news.title}}</a>
                                    </h4>
                                </td>
                            </tr>
                        </tbody>
                    </v-simple-table>
                    
                </template>
            </chart-card>
            
        </v-col>
    </v-row>
</template>

<script>
import ChartCard from '@/components/ChartCard'
export default {
    components:{
        ChartCard
    },
    data(){
        return {
            naverNews : '',
            googleNews : ''
        }
    },
    created(){
        this.newsCrawling()
    },
    methods:{
        async newsCrawling(){
            try{
                
                const naverPromise = axios.get('/covid/news/naver')
                const googlePromise = axios.get('/covid/news/google')

                const [naverCrawling, googleCrawling] = await Promise.all([naverPromise, googlePromise])
                
                this.naverNews = naverCrawling.data
                this.googleNews = googleCrawling.data
            }catch(e){
                console.error(e)
            }
        },
    }

}
</script>

<style>

</style>