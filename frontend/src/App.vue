<template>
  <v-app>
      <v-app-bar
          color="indigo darken-2"
          dark
          app
      >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-toolbar-title>Title</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
              <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
      </v-app-bar>


      <v-navigation-drawer
          color="teal"
          :mini-variant="miniVariant"
          dark
          app
      >
          <v-list
          dense
          nav
          class="py-0"
          >
          <v-list-item two-line :class="miniVariant && 'px-0'">
              <!-- <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar> -->

              <v-list-item-content>
              <v-list-item-title>Application</v-list-item-title>
              <v-list-item-subtitle>Subtext</v-list-item-subtitle>
              </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
              v-for="item in items"
              :key="item.title"
              link
          >
              <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
          </v-list-item>
          </v-list>
      </v-navigation-drawer>


    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavDrawer from './components/NavDrawer'

export default {
  name: "App",

  components: {
    NavDrawer
  },

  data(){
    return {
        items: [
            { title: 'Dashboard', icon: 'mdi-view-dashboard' },
            { title: 'Photos', icon: 'mdi-image' },
            { title: 'About', icon: 'mdi-help-box' },
        ],
        miniVariant: false,
    }
  },
  computed:{
    me(){
      return this.$store.state.user.me
    }
  }
};
</script>
