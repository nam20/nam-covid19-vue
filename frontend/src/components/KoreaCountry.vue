<template>
    <v-row>
        <v-col cols="12" sm="12" md="6" >
            <chart-card>
                <template v-slot:title>
                    국내 확진자 일일 신규 증가추이
                </template>
                <template v-slot:body>
                    <line-chart 
                    v-if="koreaDailyNewChartLoaded"
                    :chart-data="koreaDailyNewChartData"
                    :height="472">
                    </line-chart>
                </template>
            </chart-card>
        
        </v-col>
        <v-col cols="12" sm="12" md="6" id="worldStatus">
            <chart-card>
                <template v-slot:title>
                    국가별 발생 분포
                </template>
                <template v-slot:body>
                    <pie-chart
                    :chart-data="worldCounrtyChartData"
                    >
                    </pie-chart>
                    <v-row justify="center">
                        <v-btn-toggle 
                        borderless 
                        mandatory
                        color="rgba(54, 162, 235, 1)" 
                        v-model="worldCounrtyChartStatus" 
                        class="my-3">
                            <v-btn value="0">
                                확진자
                            </v-btn>
                            <v-btn value="1">
                                사망자
                            </v-btn>
                            <v-btn value="2">
                                완치자
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    
                </template>
                
            </chart-card>
        </v-col>
    </v-row>
</template>

<script>
import ChartCard from './ChartCard'
import LineChart from './chart/LineChart'
import PieChart from './chart/PieChart'
import isoCountries from '@/data/isoCountries'

export default {
    components:{
        ChartCard,
        LineChart,
        PieChart
    },
    props:['koreaNewConfData','worldCountryData'],
    data(){
        return {
            koreaDailyNewChartData: '',
            koreaDailyNewChartLoaded: false,

            worldCounrtyChartDataArr: [],
            worldCounrtyChartStatus: 0,
            worldCounrtyChartLoaded: false,


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
                'rgba(255, 107, 174, 1)',
                'rgba(102, 102, 102, 1)',
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
                'rgba(255, 107, 174, 0.2)',
                'rgba(102, 102, 102, 0.2)',
            ],
        }
    },
    watch:{
        koreaNewConfData(){
            this.koreaDailyNewChart()
        },
        worldCountryData(){
            this.worldCountryChart()
        }
    },
    computed:{
        worldCounrtyChartData(){
            return this.worldCounrtyChartDataArr[this.worldCounrtyChartStatus]
        }
    },
    methods:{
        koreaDailyNewChart(){
            const { confirmed, dates } = this.koreaNewConfData
            const dailyNewConfirmed = confirmed.slice(confirmed.length - 31)
            const dailyNewDates = dates.slice(dates.length - 30)

            for(let i=0; i<30; i++){
                dailyNewConfirmed[i] = dailyNewConfirmed[i+1] - dailyNewConfirmed[i]
            }
            this.koreaDailyNewChartData = {
                labels: dailyNewDates,
                datasets:[
                    {
                        label: '확진자 (전일대비)',
                        borderColor:'rgba(54, 162, 235, 1)',
                        backgroundColor:'rgba(54, 162, 235, 0.2)',
                        pointBorderColor:'rgba(54, 162, 235, 1)',
                        pointBackgroundColor:'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        data: dailyNewConfirmed.slice(0, dailyNewConfirmed.length-1)
                    }
                ]
            }

            this.koreaDailyNewChartLoaded = true
        },
        worldCountryChart(){

            const data = this.worldCountryData
            const conf = this.countryStatusSortData(data, 'confirmed')
            const deaths = this.countryStatusSortData(data, 'deaths')
            const recovered = this.countryStatusSortData(data, 'recovered')

            this.worldCounrtyChartDataArr = [
                {
                    labels: [...(conf.data.map(covid => isoCountries[covid.country].name)), '기타'],
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
                    labels: [...(deaths.data.map(covid => isoCountries[covid.country].name)), '기타'],
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
                    labels: [...(recovered.data.map(covid => isoCountries[covid.country].name)), '기타'],
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

            //this.worldCounrtyChartData = this.worldCounrtyChartDataArr[0]
            //this.worldCounrtyChartLoaded = true
        },
        countryStatusSortData(data, status){

            const mapped = data.map((covid, i) => { 
                    return { i, value : covid[`${status}`] }
                })
            mapped.sort((a,b) => b.value - a.value)
            const sortData = mapped.map(el => data[el.i])
            
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

<style>

</style>