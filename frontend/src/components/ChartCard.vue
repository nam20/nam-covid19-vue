<template>
  <v-card>
        <v-card
        flat
        tile
        color="#f0f2f7">
                <v-card-subtitle>
                    <h3 style="color: #4678eb;"> 
                        <slot name="title"></slot> 
                    <h3>
                </v-card-subtitle>
        </v-card>
        <v-card
        flat
        tile
        :height="cardHeight">
            <slot name="body"></slot>
        </v-card>
        
    </v-card>
</template>

<script>
export default {
    props:['cardHeight'],
    
}
</script>

<style scoped>


</style>