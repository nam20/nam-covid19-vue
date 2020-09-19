<template>
    <v-row id="koreaStatus">
        <v-col cols="12" sm="12" md="6">
            
            <chart-card>
                <template v-slot:title>
                    국내 확진자 증가추이
                </template>
                <template v-slot:body>
                    <line-chart 
                    v-if="dailyTotalChartLoaded"
                    :chart-data="dailyTotalChartData"
                    :height="500"
                    >
                    </line-chart>
                </template>
            </chart-card>
            
        </v-col>
        <v-col cols="12" sm="12" md="6">
            <chart-card>
                <template v-slot:title>
                    코로나 발병 국내 지도
                </template>
                <template v-slot:body>
                    <GChart
                    type="GeoChart"
                    :settings="{ packages: [ 'geochart']}"
                    :data="cityGeoChartData"
                    :options="cityGeoChartOptions"
                    
                    />
                </template>
            </chart-card>
            
        </v-col>
    </v-row>
</template>

<script>
import ChartCard from '@/components/ChartCard'
import { GChart } from 'vue-google-charts'
import LineChart from '@/components/chart/LineChart'

export default {
    components:{
        ChartCard,
        GChart,
        LineChart
    },
    props:['dailyTotalData','cityData'],
    data(){
        return {
            dailyTotalChartLoaded : false,
            dailyTotalChartData: '',
        
            cityGeoChartData: [
               
                ['City', '확진자', '사망자'],
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
            cityGeoChartOptions: {
                region: 'KR',
                resolution: 'provinces',
                colorAxis:{
                    minValue: 0,  colors: ['#fffcfc', '#b00b0b']
                },
                height:500
            },

        }
    },
    created(){

    },
    watch:{
        dailyTotalData(){
            this.koreaDailyTotalChart()
        },
        cityData(){
            this.koreaCityGeoChart()
        }
    },
    methods:{
        koreaDailyTotalChart(){
            
            const { dates, confirmed, recovered, deaths } = this.dailyTotalData

            this.dailyTotalChartData = {
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

            this.dailyTotalChartLoaded = true
        },
        koreaCityGeoChart(){
            let { cityData } = this.cityData
            for(let i=1; i<cityData.length; i++){

                    this.cityGeoChartData[i].push(cityData[i].defCnt, cityData[i].deathCnt)
                }
        }
    }

}
</script>

<style>

</style>