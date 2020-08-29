<template>
    <v-container>
        <v-card>
            <v-container>

                <v-subheader>로그인</v-subheader>

                <v-text-field v-model="id" :counter="20" :rules="idRules" label="아이디" required></v-text-field>

                <v-text-field v-model="password" :counter="20" :rules="passwordRules" label="패스워드" required></v-text-field>


                <v-btn color="blue" @click="login">로그인</v-btn>

            </v-container>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            id:'',
            password:'',
        }
    },
    computed:{
        isValid(){
            return this.id !== '' && this.id.length <= 20 &&
             this.password !== '' && this.password.length <= 20 && this.password.length >= 8
        }
    },
    methods:{
        login(){
            this.$store.dispatch('user/login',{
                userId: this.id,
                password : this.password
            })
        }
    }

}
</script>

<style>

</style>