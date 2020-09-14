
<script>
import { PolarArea } from 'vue-chartjs'

export default {
    extends: PolarArea,
    props:['chartData'],
    data(){
        return {
            
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