<template>
  <v-app>
      <v-app-bar
          color="indigo darken-2"
          dark
          app
      >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>코로나 차트</v-toolbar-title>

          <v-spacer></v-spacer>

      </v-app-bar>


      


    <v-main>
      <router-view/>
    </v-main>
    <v-footer>
      <v-col cols="12" class="text-center">
        vuetify
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  },

  data(){
    return {
       
    }
  },
  computed:{
    me(){
      return this.$store.state.user.me
    }
  }
};
</script>
