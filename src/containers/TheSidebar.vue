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
      <div>
        <CRenderFunction v-if="token"  flat :content-to-render="$options.certificateapproved"/>
        <CRenderFunction v-else  flat :content-to-render="$options.estandar"/>
          <!-- <CRenderFunction v-if="isBussines      == 'pending'" flat :content-to-render="$options.estandar"/>
          <CRenderFunction v-else-if="isBussines == 'registered'" flat :content-to-render="$options.admin"/>
          <CRenderFunction v-else-if="isBussines == 'inspection_request'" flat :content-to-render="$options.inspeccionRequest"/>
          <CRenderFunction v-else-if="isBussines == 'document_aproved'" flat :content-to-render="$options.approved"/>
          <CRenderFunction v-else-if="isBussines == 'certificate_pending'" flat :content-to-render="$options.certificatepending"/>
          <CRenderFunction v-else flat :content-to-render="$options.certificateapproved"/> -->

      </div>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  
  </CSidebar>
</template>

<script>
import admin   from './optionmenu/_admin'
import inspeccionRequest from './optionmenu/_inspection_request'
import certificatepending from './optionmenu/_certificate_pending'
import certificateapproved from './optionmenu/_certificate_approved'
import estandar  from './optionmenu/_estandar'
import approved    from './optionmenu/_approved'
import storageData from '@/store/services/storageService'
import sessionModule from '@/store/modules/sessionModule';


export default {
  name: 'TheSidebar',
  admin,certificatepending,estandar,approved,certificateapproved,inspeccionRequest,
  
  components:{
  
  },
  data(){
    return{
      typeRol : '',
      bussine : '',
      token   : ''
    }
  },
  mounted(){
  this.typeRol = storageData.get('_rolename')
  this.bussine = storageData.get('_bussines')
  this.token   = storageData.get('_token')
  },
  computed: {
    show () {
     return (this.$store.state.sidebar) ? 'hide' : 'show';
    },
    minimize () {
      return this.$store.state.sidebarMinimize 
    },
    isBussines(){
      return sessionModule.getStatusBussines;
      
    }
  },

}
</script>
<style lang="scss">
  .c-sidebar-nav{
    margin-left: -23px;
  }
  .c-sidebar-nav-item{
      margin-left: -3%;
  }
  .c-sidebar-nav-dropdown{
    margin-left: -18%;
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
    border-radius: 35px 0px 0px 35px;
}
.c-sidebar .c-sidebar-nav-link.c-active, .c-sidebar .c-active.c-sidebar-nav-dropdown-toggle {
  color: #fff;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 35px 0px 0px 35px;
}
</style>
