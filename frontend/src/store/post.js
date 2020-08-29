const state = () =>({
    posts: []
})

const mutations = {
    setPost(state,payload){
        state.posts = payload
    }
}

const actions = {
    addPost({commit},payload){
        axios.post('/post',{
            title : payload.title,
            content : payload.content
        })
        .then(res=>{
            console.log('됐는지 안됐는지 확인 불가능 ')
        })
        .catch(err=>{
            console.error(err)
        })
    },
    async loadAllPost({commit}){
        try{
            let res = await axios.get('/post')
            console.log(res)
        }catch(err){
            console.error(err)
        }

    }
}


export default {
    namespaced:true,
    state,mutations,actions
}