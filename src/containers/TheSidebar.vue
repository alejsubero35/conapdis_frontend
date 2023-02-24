<template>
  <CSidebar 
    fixed 
    :show="show"
  
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img src="img/logos_conapdis/logo.png" width="180" alt="">
      <CIcon 
        class="c-sidebar-brand-minimized" 
        name="logo" 
        size="custom-size" 
        :height="35" 
        viewBox="0 0 110 134" 
      />
    </CSidebarBrand>
       <CRenderFunction v-if="bussine" flat :content-to-render="$options.admin"/>
       <CRenderFunction v-else flat :content-to-render="$options.estandar"/>
<!--   <CRenderFunction v-if="typeRol == 'Vendedor'" flat :content-to-render="$options.vendedor"/>
       <CRenderFunction v-if="typeRol == 'Estandar'" flat :content-to-render="$options.estandar"/>
       <CRenderFunction v-if="typeRol == 'Tecnico'" flat :content-to-render="$options.tecnico"/> -->
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
import admin from './optionmenu/_admin'
import vendedor from './optionmenu/_vendedor'
import estandar from './optionmenu/_estandar'
import tecnico from './optionmenu/_tecnico'
import storageData from '@/store/services/storageService'


export default {
  name: 'TheSidebar',
  admin,vendedor,estandar,tecnico,
  
  components:{
  
  },
  data(){
    return{
      typeRol : '',
      bussine : ''
    }
  },
  mounted(){
  this.typeRol = storageData.get('_rolename')
  this.bussine = storageData.get('_bussines')
  },
  computed: {
    show () {
     return (this.$store.state.sidebar) ? 'hide' : 'show';
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    }
  },

}
</script>
<style lang="scss">
  .c-sidebar-nav{
    margin-left: -23px;
  }
  .c-sidebar-nav-item{
      margin-left: -10%;
  }
  .c-sidebar .c-sidebar-nav-link, .c-sidebar .c-sidebar-nav-dropdown-toggle {
    color: white;
    margin-left: 23px;
}
  .c-sidebar{
    color: #FEFEFE;
    background: #1c3969;
  }
  .c-sidebar .c-sidebar-brand {
    color: #FEFEFE;
    background: #FFFFFF;
  }
  .c-sidebar .c-sidebar-minimizer {
    background: #1c3969;
  }
  .c-sidebar .c-sidebar-nav-link, .c-sidebar .c-sidebar-nav-dropdown-toggle {
    color: white;
  }
.c-sidebar .c-sidebar-nav-link:hover, .c-sidebar .c-sidebar-nav-dropdown-toggle:hover {
    color: #fff;
    background: #A8C1C9;
}
</style>
