<template>
    <v-row>
        <v-col cols="12" md="12">
            <chart-card>
                <template v-slot:title>
                    코로나 발병 세계 지도
                </template>
                <template v-slot:body>
                    <GChart
                    type="GeoChart"
                    :settings="{ packages: [ 'geochart'] }"
                    :data="worldGeoChartData"
                    :options="worldGeoChartOptions"
                    :resizeDebounce="500"
                    v-if="worldGeoChartLoaded"
                    
                    />
                </template>
            </chart-card>
        </v-col>
        <!-- <v-col cols="12" md="6">
            <chart-card>
                <template v-slot:title>
                    전세계 확진자 증가추이
                </template>
                <template v-slot:body>
                    <line-chart
                    :chart-data="dailyTotalChartData"
                    v-if="dailyTotalChartLoaded"
                    :height="450">
                    </line-chart>
                </template>
            </chart-card>
        </v-col> -->
    </v-row>
</template>

<script>
import { GChart } from 'vue-google-charts'
import ChartCard from './ChartCard'
import LineChart from '@/components/chart/LineChart'
import isoCountries from '@/data/isoCountries'

export default {
    components:{
        GChart,
        ChartCard,
        LineChart
    },
    props:['countryData'],
    data(){
        return {
            worldGeoChartData: [['Country', '확진자', '사망자']],
            worldGeoChartOptions: {
                resolution: 'countries',
                colorAxis:{
                    minValue: 0,  colors: ['#fffcfc', '#b00b0b']
                },
                height: 0
            },
            worldGeoChartLoaded: false,

            dailyTotalChartData: '',
            dailyTotalChartLoaded: false,
            
        }
    },
    created(){
        //this.getWorldDailyTotalChart()
    },
    watch:{
        countryData(){
            this.worldCountryGeoChart()
        },
        chartHeight(){
            this.worldGeoChartOptions.height = this.chartHeight
        }
    },
    computed:{
        chartHeight(){
            return this.$vuetify.breakpoint.width * 0.624
        }
    },
    methods:{
        worldCountryGeoChart(){

            const data = this.countryData

            const countryGeoData = data.map(covid => {

                const isoCountry = isoCountries[covid.country]
                return [
                    { 
                        v: isoCountry.iso,
                        f: isoCountry.name
                    }, 
                    covid.confirmed, 
                    covid.deaths
                ]
            }).filter(covid => covid[0].v)

            this.worldGeoChartData = this.worldGeoChartData.concat(countryGeoData)

            this.worldGeoChartLoaded = true
        },
        async getWorldDailyTotalChart(){

            try{
                //const { data } = await axios.get('/covid/world/daily')
                const { data } = await axios.get('https://covid19.mathdro.id/api/daily')
                
                this.dailyTotalChartData  = {
                    labels : data.map(covid => covid.reportDate.substring(5)),
                    datasets:[
                        {
                            label: '확진자',
                            borderColor:'rgba(54, 162, 235, 1)',
                            backgroundColor:'rgba(54, 162, 235, 0.2)',
                            pointBorderColor:'rgba(255, 255, 255, 0)',
                            pointBackgroundColor:'rgba(54, 162, 235, 1)',
                            
                            borderWidth: 2,
                            data: data.map(covid => covid.confirmed.total)
                        }
                    ]
                }
                
                this.dailyTotalChartLoaded = true
            }catch(e){
                console.error(e)
            }
            
        },
        onResize(){
            this.chartHeight = window.innerHeight
        }
    }
}
</script>

<style>

</style>