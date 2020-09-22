<template>
    <v-row justify="center" id="covidStatus"> 
        <v-col cols="12" sm="12" md="6">
            <v-card>
                
                <v-card-title class="justify-center">
                    <h3>국내 현황</h3>
                </v-card-title>
                <v-row>
                    <v-col class="text-center">
                        <p>확진자</p>
                        <p class="number mb-0">{{todayKoreaTotal.totalConfirmed}}</p>
                        <p class="covid">+({{todayKoreaTotal.newConfirmed}})</p>                            
                    </v-col>
                    <v-col class="text-center">
                        <p>사망자</p>
                        <p class="number covid mb-0">{{todayKoreaTotal.totalDeaths}}</p>
                        <p class="covid">+({{todayKoreaTotal.newDeaths}})</p>   
                    </v-col>
                    <v-col class="text-center">
                        <p>치명율</p>
                        <p class="number">{{todayKoreaTotal.totalCritical}}%</p>
                    </v-col>
                    <v-col class="text-center">
                        <p>완치자</p>
                        <p class="number mb-0">{{todayKoreaTotal.totalRecovered}}</p>
                        <p class="recovered">+({{todayKoreaTotal.newRecovered}})</p>   
                    </v-col>
                </v-row>

            </v-card>
        </v-col>
        <v-col cols="12" sm="12" md="6">
            <v-card>
                <v-card-title class="justify-center">
                    <h3>세계 현황</h3>
                </v-card-title>
                <v-row>
                    <v-col class="text-center">
                        <p>확진자</p>
                        <p class="number mb-0">{{todayWorldTotal.totalConfirmed}}</p>       
                        <p class="covid">+({{todayWorldTotal.newConfirmed}})</p>                         
                    </v-col>
                    <v-col class="text-center">
                        <p>사망자</p>
                        <p class="number covid mb-0">{{todayWorldTotal.totalDeaths}}</p>
                        <p class="covid">+({{todayWorldTotal.newDeaths}})</p>   
                    </v-col>
                    <v-col class="text-center">
                        <p>치명율</p>
                        <p class="number">{{todayWorldTotal.totalCritical}}%</p>
                    </v-col>
                    <v-col class="text-center">
                        <p>완치자</p>
                        <p class="number mb-0">{{todayWorldTotal.totalRecovered}}</p>
                        <p class="recovered">+({{todayWorldTotal.newRecovered}})</p>   
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:['koreaTotalData','worldTotalData'],
    data(){
        return {
            todayKoreaTotal : '',
            todayWorldTotal : ''
        }
    },
    
    watch:{
        koreaTotalData(){
            this.getKoreaTotal()
        },
        worldTotalData(){
            this.getWorldTotal()
        }
    },
    methods:{
        getWorldTotal(){

            const yesterdayWorld = this.worldTotalData[0]
            const todayWorld = this.worldTotalData[1]
            
            const worldTotal = {
                totalConfirmed : todayWorld.confirmed ,
                totalDeaths : todayWorld.deaths,
                totalRecovered : todayWorld.recovered,
                totalCritical: (todayWorld.deaths / todayWorld.confirmed * 100 ).toFixed(1),
                newConfirmed : todayWorld.confirmed - yesterdayWorld.confirmed,
                newDeaths: todayWorld.deaths - yesterdayWorld.deaths,
                newRecovered : todayWorld.recovered - yesterdayWorld.recovered
            }

            for(let el in worldTotal){
                worldTotal[el] = this.numberCommas(worldTotal[el])
            }

            this.todayWorldTotal = worldTotal
        },
        getKoreaTotal(){

            let { confirmed, recovered, deaths } = this.koreaTotalData

            confirmed = confirmed.slice(confirmed.length-2)
            recovered = recovered.slice(recovered.length-2)
            deaths = deaths.slice(deaths.length-2)

            const koreaTotal = {
                totalConfirmed : confirmed[1],
                totalDeaths : deaths[1],
                totalRecovered : recovered[1],
                totalCritical: (deaths[1] / confirmed[1] * 100).toFixed(1),
                newConfirmed : confirmed[1] - confirmed[0],
                newDeaths : deaths[1] - deaths[0],
                newRecovered : recovered[1] - recovered[0]
            }

            for(let el in koreaTotal){
                koreaTotal[el] = this.numberCommas(koreaTotal[el])
            }

            this.todayKoreaTotal = koreaTotal
        },
        numberCommas(input){
            return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
    }

}
</script>

<style scoped>
.col p.number {
    font-size: 22px;
    font-weight: 500;
}

.col .covid {
    color: red;
}

.col .recovered {
    color: rgb(34, 182, 23);
}

</style>