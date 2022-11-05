<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
     <img src="img/logos_memorytech/Logo_mobile.png" width="180" alt="imagen" title="log_sistema">
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      
    </CHeaderNav>
    <CHeaderNav class="mr-4">
<!--       <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell"/>
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list"/>
        </CHeaderNavLink>
      </CHeaderNavItem> -->
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink class="rolname">
          {{ nameUser }} 
        </CHeaderNavLink>
      </CHeaderNavItem>
      <TheHeaderDropdownAccnt/>
    </CHeaderNav>
<!--     <CSubheader class="px-3">
      <CBreadcrumbRouter class="border-0 mb-0"/>
    </CSubheader> -->
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import sessionModule from '@/store/modules/sessionModule';
import storageData from '@/store/services/storageService'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt
  },
  data(){
    return{
      rolName : '',
      nameUser : ''
    }
  },
  mounted(){
    this.rolName  = storageData.get('_rolename')
    this.nameUser = storageData.get('_nameUser').toUpperCase()
  }
}
</script>
<style scoped>
.rolname{
  font-weight: 700;
}
.c-header.c-header-fixed{
  position: fixed !important;
}
</style>
