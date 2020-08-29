import Axios from "axios"


const state = () => ({
    me : ''
})

const mutations = {
    setMe(state,payload){
        state.me = payload
        console.log(state.me)
    }
}

const actions = {
    loadUser({commit}){
        axios.post(`/user`)
        .then(({data})=>{
            if(typeof data === 'object') commit('setMe',data)
        })
        .catch(err=>{
            console.error(err)
        })
    },

    register({commit},payload){
        axios.post('/user/register',payload)
        .then(({data})=>{
            if(! data.fail){
                localStorage.setItem("token",data.token);
                commit('setMe',data.user)
            }
            else alert(data.fail)
            // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        })
        .catch(err=>{
            console.log(err.response)
        })
    },
    login({commit},payload){

        axios.post('/user/login',payload)
        .then(({data})=>{
            if(! data.fail){
                localStorage.setItem("token",data.token);
                commit('setMe',data.user)

            }
            else alert(data.fail)

            console.log(data)
            //axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
        })
        .catch(err=>{
            console.log(err.response)
        })
    },
    logout({commit}){
        delete localStorage.token
        //axios.defaults.headers.common['Authorization'] = undefined
        commit('setMe','')
    },
    changeNickname({commit},payload){
        axios.post('user/nickname',{
            nickname:payload.nickname
        })
        .then(()=>{
            commit('changeNickname',payload)
        })
        .catch(err=>{
            console.error(err)
        })
    }

}

export default {
    namespaced:true,
    state,mutations,actions
}