<template>
  <v-card>
        <v-card
        outlined
        tile
        color="rgba(0, 0, 0, 0.04)">
                <v-card-subtitle>
                    <h3> 
                        <slot name="title"></slot> 
                    <h3>
                </v-card-subtitle>
        </v-card>
        <v-card
        outlined
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

<style>

</style>