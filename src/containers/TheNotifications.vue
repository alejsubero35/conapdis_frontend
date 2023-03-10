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
            :content="arraystatus.length"
          >
          <CIcon name="cil-bell"/>
          </v-badge>
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownItem  class="item" v-for="(array,index) in arraystatus" :key="index" >
        <p class="item-notify"  @click="viewNotifications(index)">{{array.name}}</p>
  <!--       <ul v-for="(array,index) in arraystatus" :key="index">
          <li style="list-style:none" @click="viewNotifications(index)"></li>
        </ul> -->
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
    arraystatus = [
        {name:'Abierto',id: '1'},
        {name:'En Proceso',id: '2'},
        {name:'Cancelado',id: '3'},
        {name:'Cerrado',id: '4'}
    ];
  viewNotifications(index){alert(index)
    //this.$router.push({ name: "updatepassword" });
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
  .item{
    border-bottom: 1px solid lightgray;
  }
  .item-notify{
    margin: 0;
  }
  </style>
  
  
  