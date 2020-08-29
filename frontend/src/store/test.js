
const state = () =>({
    matchData: []
})

const getters = {
    lckmatches: state => {
        return state.matchData.filter(match => match.league.name == 'LCK')
    }
}

const mutations = {
    apitest(state,payload){

        state.matchData = payload
    }
}

const actions = {
    async apitest({commit}){
        try{
            let today = new Date();
            today.setHours(0);
            let start = today.toISOString();
            today.setDate(today.getDate()+7);
            let end = today.toISOString();
            const matches = await axios({
                method:"get",
                url:"https://api.pandascore.co/lol/matches/upcoming",
                headers:{
                    "Authorization" : `Bearer X0o4vH9HNJquZu0I4AClSKwe6T-TY6wevBHfYXDeGb1JoihssJQ`
                },
                params:{
                    "range[begin_at]" : `${start},${end}`
                }
            })
            console.log(`${start},${end}`)
            commit('apitest',matches.data)

        }catch(err){
            console.error(err)
        }
    }
}

export default {
    namespaced:true,
    state,getters,mutations,actions
}