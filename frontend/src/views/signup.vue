<template>
    <v-container>
        <v-card>
            <v-container>

                <v-subheader>회원가입</v-subheader>

                <v-text-field v-model="id" :counter="20" :rules="idRules" label="아이디" required></v-text-field>

                <v-text-field v-model="password" :counter="20" :rules="passwordRules" label="패스워드" required></v-text-field>

                <v-text-field v-model="passwordCheck" :counter="20" :rules="passwordCheckRules" label="패스워드 확인" required></v-text-field>

                <v-text-field v-model="nickname" :counter="10" :rules="nicknameRules" label="닉네임" required></v-text-field>

                <v-select v-model="select" :items="tier" label="랭크 티어"></v-select>


                <v-btn color="blue lighten-3" :disabled="!isValid" @click="register">회원가입</v-btn>
                <v-btn color="blue" @click="testlogin">테스트 로그인</v-btn>
                <v-btn @click="testload">테스트 로드</v-btn>
                <v-btn @click="logout">로그아웃</v-btn>
                <v-btn @click="changeNickname">닉네임 테스트</v-btn>
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
        passwordCheck:'',
        nickname: '',
        idRules:[
            v => !!v || '아이디는 필수입니다',
            v => v.length <= 20 || '아이디는 20자 이하로 입력해주세요'
        ],
        passwordRules:[
            v => !!v || '패스워드는 필수입니다',
            v => (v && v.length <= 20 && v.length >= 8) || '패스워드는 8자 이상 20자 이하로 입력해주세요'
        ],
        passwordCheckRules:[
            v => !!v || '패스워드 확인은 필수입니다',
            v => (v && v.length <= 20 && v.length >= 8) || '패스워드는 8자 이상 20자 이하로 입력해주세요',
            v => v === this.password || '패스워드가 일치하지 않습니다.'
        ],
        nicknameRules: [
            v => !!v || '닉네임은 필수입니다',
            v => (v && v.length <= 10) || '닉네임은 10자 이하로 입력해주세요',
        ],
        select: '언랭크',
        tier: [
            '아이언',
            '브론즈',
            '실버',
            '골드',
            '플래티넘',
            '다이아몬드',
            '마스터',
            '그랜드마스터',
            '챌린저'
        ],
      }
    },

    methods: {
        idOverlapCheck(){

        },
        register(){
            this.$store.dispatch('user/register',{
                userId : this.id,
                password : this.password,
                nickname : this.nickname,
                tier : this.select,

            })
        },
        testlogin(){
            this.$store.dispatch('user/login',{
                userId: this.id,
                password : this.password
            })
        },
        testload(){
            this.$store.dispatch('user/loadUser')

        },
        logout(){
            this.$store.dispatch('user/logout')
        },
        changeNickname(){
            this.$store.dispatch('user/changeNickname',{
                nickname : this.nickname
            })
        }
    },
    computed: {
        isValid(){
            return this.id !== '' && this.id.length <= 20 &&
             this.password !== '' && this.password.length <= 20 && this.password.length >= 8 &&
             this.passwordCheck !== '' && this.passwordCheck.length <= 20 && this.passwordCheck.length >= 8 &&
             this.nickname !== '' && this.nickname.length <= 20
        }
    }
  }

</script>

<style>

</style>