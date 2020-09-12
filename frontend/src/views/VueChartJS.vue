<template>
    <v-container>
        <h2>example vue-chartjs</h2>
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
            <v-card>
                <h3>Bar Chart</h3>
                <bar-chart></bar-chart>
            </v-card>    
        </v-col>
        <v-col>
            <v-card>
                <h3>Bubble Chart</h3>
                <bubble-chart></bubble-chart>
            </v-card>
        </v-col>
        <v-col>
            <v-card>
                <h3>Reactive Chart</h3>
                <reactive :chart-data="datacollection"></reactive>
                <v-btn color="success" @click="fillData()">Randomize</v-btn>
            </v-card>
        </v-col>
        
       
    </v-container>
   
</template>

<script>
import LineChart from '@/components/LineChart'
import BarChart from '@/components/BarChart'
import BubbleChart from '@/components/BubbleChart'
import Reactive from '@/components/Reactive'


export default {
    name: 'VueChartJS',
    components:{
        LineChart,
        BarChart,
        BubbleChart,
        Reactive
    },
    data () {
        return {
            // instantiating datacollection with null
            datacollection: null,
            loaded:false
        }
    },
    created () {
        //anytime the vue instance is created, call the fillData() function.
        this.fillData()
        this.corona()
    },
    methods: {
        fillData () {
            this.datacollection = {
            // Data for the y-axis of the chart
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                label: 'Data One',
                backgroundColor: '#03fcec',
                // Data for the x-axis of the chart
                data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
                }
                ]
            }
        },
        getRandomInt () {
            // JS function to generate numbers to be used for the chart
            return Math.floor(Math.random() * (50 - 5 + 1)) + 5
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
        }
    }

    
}
</script>

<style>

</style>