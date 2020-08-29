<template>
    <v-container>
        <v-text-field v-model="title"></v-text-field>
        <v-text-field v-model="content"></v-text-field>
        <v-btn @click="submitPost">작성</v-btn>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            title:'',
            content:'',
        }
    },
    methods:{
        submitPost(){
            this.$store.dispatch('post/addPost',{
                title: this.title,
                content: this.content,

            })
        }
    }
}
</script>

<style>

</style>