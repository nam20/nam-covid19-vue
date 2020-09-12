

<script>
import {Bar, mixins} from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Bar,
    mixins: [ reactiveProp ],
    // props:['chartData'],
    data () {
      return {
        
        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
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
    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.chartData, this.options)
    }
}
</script>

<style>

</style>