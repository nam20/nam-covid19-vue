

<script>
import {Line, mixins} from 'vue-chartjs'

export default {
    extends: Line,
    props:['chartData'],
    data(){
        return {
            
            //Chart.js options that controls the appearance of the chart
            options: {
                tooltips: {
                    callbacks: {
                    label: (tooltipItem, data) => {
                            const value =
                            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return this.numberWithCommas(value) + '명';
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: (value, index, values) => {
                                return this.numberWithCommas(value);
                            }
                        },
                        gridLines: {
                            display: true
                        }
                    }],
                    xAxes: [ {
                        gridLines: {
                            display: false,
                        },
                        ticks:{
                            padding: 5,
                            autoSkipPadding: 50,
                            maxRotation: 30,
                            
                        }
                    }]
                },
                legend: {
                    display: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted(){
        this.renderChart(this.chartData, this.options)
    },
    methods: {
        numberWithCommas(num){
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }
}
</script>

<style>

</style>