<template>
    <CDropdown
      inNav
      class="c-header-nav-items"
      placement="bottom-end"
      add-menu-classes="pt-0"
    >
      <template #toggler>
        <CHeaderNavLink>
          <div class="c-avatar">
            <v-badge
            color="primary"
            content="6"
          >
          <CIcon name="cil-bell"/>
          </v-badge>
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownItem @click="viewNotifications()">
        <CIcon name="cil-sync" /> Cambiar Contraseña
      </CDropdownItem>    

    </CDropdown>
  </template>
  <script lang="ts">
  
  import { Component, Vue } from 'vue-property-decorator';
  import Logout from '@/views/auth/Logout.vue';
  
  @Component({
    components: {
      Logout
    },
  
  })
  
  export default class TheNotifications extends Vue {
  viewNotifications(){
    this.$router.push({ name: "updatepassword" });
  }
  
  }
  </script>
  <style scoped>
    .c-avatar-img{
      margin-left: 19px;
    }
    .v-application a {
      color: #0c0c0c;
  }
  </style>
  
  
  