<template>
       <v-container fluid style="background-color: #f7f9fc"> 
            
            <today-total 
            :koreaTotalData="koreaDailyTotalData" 
            :worldTotalData="worldTotalData"
            >
            </today-total>
          
            <korea-daily
            :dailyTotalData="koreaDailyTotalData"
            :cityData="koreaCityData">
            </korea-daily>
        
            <covid-news>
            </covid-news>
      
            <city-gender
            :cityData="koreaCityData"
            :genderData="koreaGenData">
            </city-gender>

            <age-status
            :ageData="koreaAgeData">
            </age-status>

            <korea-country
            :koreaNewConfData="koreaDailyTotalData"
            :worldCountryData="countryTotalData">
            </korea-country>

            <world-daily
            :countryData="countryTotalData">
            </world-daily>

            <covid-other
            :koreaTotalData="koreaDailyTotalData" 
            :worldTotalData="worldTotalData">
            </covid-other>
            
        </v-container>        
</template>

<script>
import TodayTotal from '@/components/TodayTotal'
import CovidNews from '@/components/CovidNews'
import KoreaDaily from '@/components/KoreaDaily'
import CityGender from '@/components/CityGender'
import AgeStatus from '@/components/AgeStatus'
import KoreaCountry from '@/components/KoreaCountry'
import WorldDaily from '@/components/WorldDaily'
import CovidOther from '@/components/CovidOther'

export default {
    components:{
        TodayTotal,
        CovidNews,
        KoreaDaily,
        CityGender,
        AgeStatus,
        KoreaCountry,
        WorldDaily,
        CovidOther
    },
    data(){
        return {
            
            worldTotalData : '',
            
            koreaDailyTotalData:'',
            
            koreaCityData:'',

            koreaGenData:'',
    
            koreaAgeData:'',

            countryTotalData:'',
        }
    },

    created(){
        this.getKoreaDailyTotal()
        this.getCountryTotal()
        this.covidGenAge();
        this.covidCity();
    },
    methods:{
       
        async getCountryTotal(){
            try{
                let { data } = await axios.get('/covid/world')
                
                data = data.map(covid => {
                    return {
                        confirmed : this.stringFormat(covid.confirmed),
                        recovered : this.stringFormat(covid.recovered),
                        deaths : this.stringFormat(covid.deaths),
                        country : covid.country
                    }
                })
                
                this.worldTotalData = data.slice(0,2)

                this.countryTotalData = data.slice(2,217)

            }catch(e){
                console.error(e)
            }
        },
        async getKoreaDailyTotal(){
            try{
                let { data } = await axios.get('/covid/korea/day')
                console.log(data)
                data = data.response.body.items.item.reverse()
                data.splice(116, 2)
                
                //this.koreaTotal = data.slice(data.length-2)
                
                const dates = data.map(covid => covid.createDt.substring(5,10))
                const confirmed = data.map(covid => covid.decideCnt)
                const recovered = data.map(covid => covid.clearCnt)
                const deaths = data.map(covid => covid.deathCnt)

                this.koreaDailyTotalData = {
                    dates, 
                    confirmed,
                    recovered,
                    deaths
                }

                
            }catch(e){
                console.error(e)
            }
        },
       
        async covidGenAge(){
            try{
                const res = await axios.get('/covid/korea/genAge')
                
                const data = res.data.response.body.items.item
                
               
                this.koreaAgeData = data.slice(0, 9)
          
                this.koreaGenData = data.slice(9, 11)

            }catch(e){
                console.error(e)
            }
        },
        async covidCity(){
            try{
                const res = await axios.get('/covid/korea/city')
                const cityData = res.data.response.body.items.item.slice(0, 18)
                const cityNames = cityData.map(city => city.gubun)

                this.koreaCityData = {
                    cityData, 
                    cityNames
                }
            }catch(e){
                console.error(e)
            }
        },
        stringFormat(input){
            return input && input != "N/A" ? parseInt(input.replaceAll(/,/g, ''), 10) : 0
        },
    }
}
</script>

<style scoped>
</style>
