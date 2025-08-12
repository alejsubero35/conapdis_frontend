<template>
  <v-app>
    <transition name="page" mode="out-in">
      <v-main>
        <router-view/>
        <!-- <add-to-home/> -->
      </v-main>
    </transition>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AddToHome from '@/pwa/components/addToHomeScreen.vue'

@Component({
  name: 'App',
  components: {
    AddToHome
  }
})
export default class extends Vue {}
</script>
<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
  

</style>
