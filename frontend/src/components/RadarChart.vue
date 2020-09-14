

<script>
import { Radar } from 'vue-chartjs'

export default {
    extends: Radar,
    props:['chartData'],
    data(){
        return {
            options: {
                tooltips: {
                    callbacks: {
                    label: (tooltipItem, data) => {
                            const value =
                            data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return this.numberWithCommas(value) + '%';
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