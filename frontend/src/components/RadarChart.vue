

<script>
import { Radar } from 'vue-chartjs'

export default {
    extends: Radar,
    props:['chartData'],
    data(){
        return {
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    mounted(){
        this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>