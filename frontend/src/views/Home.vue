<template>
  <div class="home">
    <v-btn color="info" @click="$router.push('/')">back</v-btn>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
      v-for="lck in lckmatches"
      :key="lck.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">OVERLINE</div>
          <v-list-item-title class="headline mb-1">Headline 5</v-list-item-title>
          <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn text>Button</v-btn>
        <v-btn text>Button</v-btn>
      </v-card-actions>
    </v-card>
    <v-btn color="success" @click="apitest()">test</v-btn>
  </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {

  },
  created(){
    this.$store.dispatch('test/apitest')

  },
  computed:{
    lckmatches(){
      return this.$store.getters['test/lckmatches']
    }
  },
  methods:{
    apitest(){
      console.log(this.lckmatches)
    }
  }


};
</script>
