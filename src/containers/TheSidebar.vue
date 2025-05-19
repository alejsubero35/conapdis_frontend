<template>
  <CSidebar
    fixed
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <img src="img/logos_conapdis/logo.png" width="180" alt="" />

      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>
    <div v-if="currentRouteName != 'reportes'">
      <CRenderFunction
        v-if="token"
        flat
        :content-to-render="$options.certificateapproved"
      />
      <CRenderFunction v-else flat :content-to-render="$options.estandar" />
    </div>
    <div v-else>
      <CRenderFunction flat :content-to-render="$options.approved" />
    </div>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
    <div class="p-3">
      <CButton color="primary" block @click="dialog = true">
        Datos Bancarios
      </CButton>
      <v-dialog v-model="dialog" max-width="500">
        <v-card>
          <v-card-title
            style="color: #1c3969; font-weight: bold"
            class="headline"
            >Información Bancaria</v-card-title
          >
          <v-card-text>
            <!-- Información Bancaria -->
            <div>
              <p><strong>Banco:</strong> Banco Ejemplo</p>
              <p><strong>Cuenta:</strong> 1234567890</p>
              <p><strong>Titular:</strong> Juan Pérez</p>
            </div>
            <v-divider class="my-4"></v-divider>
            <!-- Pago Móvil -->
            <div>
              <h5
                class="mb-3"
                style="color: #1c3969; font-weight: bold; font-size: 24px"
              >
                Pago Móvil
              </h5>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <strong>Banco:</strong>
                  <div>Banco Ejemplo</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Teléfono:</strong>
                  <div>0414-1234567</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Cédula:</strong>
                  <div>V-12.345.678</div>
                </v-col>
                <v-col cols="12" sm="6">
                  <strong>Código:</strong>
                  <div>0102</div>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">Cerrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </CSidebar>
</template>

<script>
import admin from "./optionmenu/_admin";
import inspeccionRequest from "./optionmenu/_inspection_request";
import certificatepending from "./optionmenu/_certificate_pending";
import certificateapproved from "./optionmenu/_certificate_approved";
import estandar from "./optionmenu/_estandar";
import approved from "./optionmenu/_approved";
import storageData from "@/store/services/storageService";

export default {
  name: "TheSidebar",
  admin,
  certificatepending,
  estandar,
  approved,
  certificateapproved,
  inspeccionRequest,

  components: {},
  data() {
    return {
      typeRol: "",
      bussine: "",
      token: "",
      dialog: false,
    };
  },
  mounted() {
    this.typeRol = storageData.get("_rolename");
    this.token = storageData.get("_token");
  },
  computed: {
    show() {
      return this.$store.state.sidebar ? "hide" : "show";
    },
    minimize() {
      return this.$store.state.sidebarMinimize;
    },
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>
<style lang="scss">
.c-sidebar-nav {
  margin-left: -23px;
}
.c-sidebar-nav-item {
  margin-left: -3%;
}
.c-sidebar-nav-dropdown {
  margin-left: -18%;
}
.c-sidebar .c-sidebar-nav-link,
.c-sidebar .c-sidebar-nav-dropdown-toggle {
  color: white;
  margin-left: 23px;
}
.c-sidebar {
  color: #fefefe;
  background: #1c3969;
}
.c-sidebar .c-sidebar-brand {
  color: #fefefe;
  background: #ffffff;
}
.c-sidebar .c-sidebar-minimizer {
  background: #1c3969;
}
.c-sidebar .c-sidebar-nav-link,
.c-sidebar .c-sidebar-nav-dropdown-toggle {
  color: white;
}
.c-sidebar .c-sidebar-nav-link:hover,
.c-sidebar .c-sidebar-nav-dropdown-toggle:hover {
  color: #fff;
  background: #a8c1c9;
  border-radius: 35px 0px 0px 35px;
}
.c-sidebar .c-sidebar-nav-link.c-active,
.c-sidebar .c-active.c-sidebar-nav-dropdown-toggle {
  color: #fff;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 35px 0px 0px 35px;
}
</style>
