const state = () =>({
    worldCountry : '',
    koreaDaily: '',
    koreaCity:'',
    koreaGenAge:''
    
})

const getters = {
    worldTotal : state => {
        return state.worldCountry.slice(0,2)
    },
    countryTotal : state => {
        return state.worldCountry.slice(2,217)
    },
    koreaTotal : state => {

    }
}

const mutations = {
    setWorldCountry(state, payload){
        state.worldCountry = payload
    },
    setKoreaDaily(state, payload){
        state.koreaDaily = payload
    },
    setKoreaCity(state, payload){
        state.koreaCity = payload
    },
    setKoreaGenAge(state, payload){
        state.koreaGenAge = payload
    },
}

const actions = {
    async getWorldCountry({commit}){
        try{
            const { data } = await axios.get('/covid/world')
            commit('setWorldCountry', data)
            
        }catch(e){
            console.error(e)
        }
    },
    async getKoreaDaily({commit}){
        try{
            const { data } = await axios.get('/covid/korea/day')
            commit('setKoreaDaily', data.response.body.items.item.reverse().splice(116, 2))
        }catch(e){
            console.error(e)
        }
    },
    async getKoreaCity({commit}){
        try{
            const { data } = await axios.get('/covid/korea/city')
            commit('setKoreaCity', data)
        }catch(e){
            console.error(e)
        }
    },
    async getKoreaGenAge({commit}){
        try{
            const { data } = await axios.get('/covid/korea/genAge')
            commit('setKoreaGenAge', data)
        }catch(e){
            console.error(e)
        }
    },
    
}

export default {
    namespaced:true,
    state,getters,mutations,actions
}