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
          <img
            src="img/logos_conapdis/conapdis_circular.png"
            class="c-avatar-img"
            alt="imagen"
            title="imagen"
          />
        </div>
      </CHeaderNavLink>
    </template>
<!--     <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Perfil de Cuenta</strong>
    </CDropdownHeader> -->
    <CDropdownItem @click="updatePassword()">
      <CIcon name="cil-shield-alt" /> Cambiar Contraseña
    </CDropdownItem>    
    <Logout/>
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

export default class TheHeaderDropdownAccnt extends Vue {
updatePassword(){
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


