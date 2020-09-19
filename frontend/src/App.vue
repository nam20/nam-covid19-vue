<template>
  <v-app>

    <v-navigation-drawer
        v-model="drawer"
        clipped 
        app
        width="170px"
        color="primary"
        dark
      >
        <v-list dense>
          <v-list-item>
            <v-list-item-subtitle><h3>현황</h3></v-list-item-subtitle>
          </v-list-item>

          <v-divider></v-divider>
          
          <v-list-item @click="$vuetify.goTo('#covidStatus')">
            <v-list-item-content>
              <v-list-item-title><h4>확진자 현황</h4></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$vuetify.goTo('#koreaStatus')">
            <v-list-item-content>
              <v-list-item-title><h4>국내 정보</h4> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$vuetify.goTo('#worldKoreaNews')">
            <v-list-item-content>
              <v-list-item-title><h4>주요 뉴스</h4> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$vuetify.goTo('#worldStatus')">
            <v-list-item-content>
              <v-list-item-title><h4>세계 정보</h4> </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item @click="$vuetify.goTo('#cityConfirmed')">
            <v-list-item-content>
              <v-list-item-title><h4>확진자 동향</h4>  </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="$vuetify.goTo('#covidPrevention')">
            <v-list-item-content>
              <v-list-item-title><h4>예방 수칙</h4>  </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
        </v-list>
        
      </v-navigation-drawer>
    
      <v-app-bar
          dense
          clipped-left
          color="white"
          app
      >
          <v-toolbar-title><h3 style="color: #4678eb;">코로나 보드</h3></v-toolbar-title>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          
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
       drawer: null,
    }
  },
  computed:{
    
  }
};
</script>

<style scoped>

</style>