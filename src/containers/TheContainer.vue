<template>
  <div class="c-app" >
    <div v-if="isImpersonated" class="impersonate-banner">
      <span>Estás viendo como: <strong>{{ impersonatedName }}</strong></span>
      <button class="btn btn-sm btn-light ml-3" @click="backToAdmin">
        ← Volver al Admin
      </button>
    </div>
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
import storageData from '@/store/services/storageService'

@Component({
  components: {
    
    TheHeader,
    TheFooter,
    TheSidebar
    
  }
})
export default class TheContainer extends Vue {

  get isImpersonated(): boolean {
    return !!storageData.get('_impersonated');
  }

  get impersonatedName(): string {
    return storageData.get('_nameUser') || 'usuario empresa';
  }

  backToAdmin() {
    const adminUrl = storageData.get('_impersonate_admin_url') || '';
    // Limpiar sesión Vue
    localStorage.clear();
    // Redirigir al admin Blade
    if (adminUrl) {
      window.location.href = adminUrl;
    } else {
      window.location.href = '/admin/users';
    }
  }

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
.impersonate-banner {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #f0ad4e;
  color: #fff;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.impersonate-banner .btn-light {
  color: #333;
  font-weight: 600;
}
</style>
