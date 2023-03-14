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
            v-if="arrayNotifications.length"
            color="primary"
            :content="arrayNotifications.length"
            >
          <CIcon name="cil-bell"/>
          </v-badge>
          <v-badge
          v-else
          color="primary"
          content="0"
          >
        <CIcon name="cil-bell"/>
        </v-badge>
          </div>
        </CHeaderNavLink>
      </template>
      <CDropdownItem  class="item" v-for="(item,index) in arrayNotifications" :key="index">
        <p class="item-notify"  @click="viewNotifications(item)">{{item.title}}</p>
  <!--  <ul v-for="(array,index) in arrayNotifications" :key="index">
          <li style="list-style:none" @click="viewNotifications(index)"></li>
        </ul> -->
      </CDropdownItem>    

    </CDropdown>
  </template>
  <script lang="ts">
  
  import { Component, Vue } from 'vue-property-decorator';
  import Logout from '@/views/auth/Logout.vue';
  import globalModule from '@/store/modules/globalModule';
  import sessionModule from '@/store/modules/sessionModule';
  import storageData from '@/store/services/storageService'

  @Component({
    components: {
      Logout
    },
  })
  
  export default class TheNotifications extends Vue {
    arrayNotifications = [];
    get getToken() {
        return sessionModule.getTokens; 
    }
  async viewNotifications(item){
    const data: any = await globalModule.getNotificationsById(item.id_notification);
                      await globalModule.getNotificationsByIdModel(item.id_model);
    switch (item.type) {
      case 'busine_register':
        this.$router.push({ name: "pdfnotification" });
      break;
      case '':
        this.$router.push({ name: "updatepassword" });
      break;
      case '':
        this.$router.push({ name: "updatepassword" });
      break;
      default:
        alert( "Desconozco estos valores" );
    }
  }
  async getNotificationsAll(){
    const data: any = await globalModule.getNotificationsAll();
    this.arrayNotifications = data.data.data
    console.log(data.data.data)
 
  }
  mounted(){

    this.getNotificationsAll()
    if(storageData.get('_token') != 'null'){
      setInterval(() => {
          console.log(storageData.get('_token'))
        this.getNotificationsAll()
      },5000 );
    }

 
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
  
  
  