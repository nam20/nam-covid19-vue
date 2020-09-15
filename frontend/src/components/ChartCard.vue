<template>
  <v-card>
        <div style="background-color:#f0f2f7">
            <v-card-subtitle>
                <h3 style="color: #4678eb;"> 
                    <slot name="title"></slot> 
                <h3>
            </v-card-subtitle>
        </div>
        <div :style="{ height : cardHeight }">
            <slot name="body"></slot>
        </div>
    </v-card>
</template>

<script>
export default {
    props:['cardHeight'],
    
}
</script>

<style scoped>


</style>