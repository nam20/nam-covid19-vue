

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
    },
    methods:{
      numberWithCommas(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
}
</script>

<style>

</style>