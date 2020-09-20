<template>
    <v-row>
        <v-col cols="12" sm="12" md="6">
            <chart-card card-height="420px">
                <template v-slot:title>
                    연령대별 확진자 분석
                </template>
                <template v-slot:body>
                    <polar-area-chart
                    :chart-data="ageConfChartData"
                    v-if="ageDataChartLoaded">
                    </polar-area-chart>
                </template>
            </chart-card>
    
        </v-col>
        <v-col cols="12" sm="12" md="6">
            <chart-card card-height="420px">
                <template v-slot:title>
                    연령대별 치명율 분석
                </template>
                <template v-slot:body>
                    <radar-chart
                    :chart-data="ageCriticalChartData"
                    v-if="ageDataChartLoaded">
                    </radar-chart>
                </template>
            </chart-card>
        </v-col>
    </v-row>
</template>

<script>
import PolarAreaChart from '@/components/chart/PolarAreaChart'
import RadarChart from '@/components/chart/RadarChart'
import ChartCard from '@/components/ChartCard'

export default {
    components:{
        PolarAreaChart,
        RadarChart,
        ChartCard
    },
    props:['ageData'],
    data(){
        return {
            ageConfChartData : '',
            ageCriticalChartData : '',

            ageDataChartLoaded : false,


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
        }
    },
    watch:{
        ageData(){
            this.ageDataChart() 
        }
    },
    methods:{
        ageDataChart(){
            const age = this.ageData.map(covid => covid.gubun)
            
            this.ageConfChartData = {
                    labels: age,
                    datasets:[
                        {
                            label: '확진자',
                            borderWidth: 1,
                            backgroundColor: this.backgroundColor,
                            borderColor: this.borderColor,
                            data : this.ageData.map(covid => covid.confCase)
                        }
                    ]
                }

            this.ageCriticalChartData = {
                labels : age,
                datasets:[
                    {
                        label: '치명율 (사망자/확진자)',
                        
                        backgroundColor:'rgba(54, 162, 235, 0.2)',
                        
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: this.ageData.map(covid => covid.criticalRate)
                    },
                   
                    
                ]
            }

            this.ageDataChartLoaded = true
        }
    }

}
</script>

<style>

</style>