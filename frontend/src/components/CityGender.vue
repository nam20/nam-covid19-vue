<template>
    <v-row>
        <v-col cols="12" sm="12" md="6">
            <chart-card>
                <template v-slot:title>
                    도시별 확진자 현황
                </template>
                <template v-slot:body>
                    <bar-chart
                    :chart-data="cityChartData"
                    >
                    </bar-chart>
                    <v-row justify="center">
                        <v-btn-toggle 
                        borderless 
                        mandatory
                        color="rgba(54, 162, 235, 1)" 
                        v-model="cityStatus" 
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
        <v-col cols="12" sm="12" md="6">
            <chart-card>
                <template v-slot:title>
                    성별 확진자 현황
                </template>
                <template v-slot:body>
                    <pie-chart
                    :chart-data="genChartData"
                    >
                    </pie-chart>
                    <v-row justify="center">
                        <v-btn-toggle 
                        borderless 
                        mandatory
                        color="rgba(54, 162, 235, 1)" 
                        v-model="genStatus" 
                        class="my-3">
                            <v-btn value="0">
                                확진자
                            </v-btn>
                            <v-btn value="1">
                                사망자
                            </v-btn>
                        </v-btn-toggle>
                    </v-row>
                    
                </template>
            </chart-card>
            
        </v-col>
    </v-row>
</template>

<script>
import ChartCard from '@/components/ChartCard'
import BarChart from '@/components/chart/BarChart'
import PieChart from '@/components/chart/PieChart'

export default {
    components:{
        ChartCard,
        BarChart,
        PieChart
    },
    props:['cityData','genderData'],
    data(){
        return {
            cityChartDataArr: [],
            cityStatus : 0,
            genChartDataArr: [],
            genStatus: 0
        }
    },
    watch:{
        cityData(){
            this.cityDataChart()
        },
        genderData(){   
            this.genderDataChart()
        }
    },
    computed:{
        cityChartData(){
            return this.cityChartDataArr[this.cityStatus]
        },
        genChartData(){
            return this.genChartDataArr[this.genStatus]
        }
    },
    methods:{
        cityDataChart(){
            const { cityData, cityNames } = this.cityData

            this.cityChartDataArr = [
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
            
        },
        genderDataChart(){

            const genData = this.genderData
            const gen = genData.map(covid => covid.gubun)

            this.genChartDataArr = [
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
            
        }
    }
}
</script>

<style>

</style>