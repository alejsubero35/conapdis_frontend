<template>
  <div class="c-app" >
    <TheSidebar/>
    <CWrapper>
      <TheHeader/>
      <div class="c-body" >
        <main class="c-main" > 
          <CContainer fluid>
            <transition name="fade">
              <router-view></router-view>
            </transition>
          </CContainer>
        </main>
        <TheFooter/>
      </div>
    </CWrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TheSidebar from './TheSidebar.vue'
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'

@Component({
  components: {
    
    TheHeader,
    TheFooter,
    TheSidebar
    
  }
})
export default class TheContainer extends Vue {



}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.c-main {
    flex-basis: auto;
    flex-shrink: 0;
    flex-grow: 1;
    min-width: 0;
    padding-top: 5rem;
}
</style>
