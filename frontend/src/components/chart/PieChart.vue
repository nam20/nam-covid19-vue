

<script>
import { Pie, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Pie,
    mixins: [reactiveProp],
    // props:['chartData'],
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