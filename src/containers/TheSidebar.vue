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
      <v-dialog v-model="dialog" max-width="500" content-class="modern-dialog">
        <v-card class="modern-card">
          <v-card-title class="modern-title">
            <v-icon color="#1976d2" left>mdi-bank</v-icon>
            <span>Información Bancaria</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon color="#d54949">mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div class="modern-section">
              <h5 class="modern-subtitle">
                <v-icon color="#4f9cb9" left>mdi-cellphone-message</v-icon>
                Pago Móvil
              </h5>
              <v-row dense>
                <v-col cols="12" sm="6" class="modern-item">
                  <v-icon color="#fdbd1a" left>mdi-bank-outline</v-icon>
                  <span class="modern-label">Banco:</span>
                  <span class="modern-value">Bancamiga</span>
                </v-col>
                <v-col cols="12" sm="6" class="modern-item">
                  <v-icon color="#4f9cb9" left>mdi-phone</v-icon>
                  <span class="modern-label">Teléfono:</span>
                  <span class="modern-value">04265181924</span>
                  <v-icon small class="ml-2 copy-icon" @click="copyToClipboard('04265181924')">mdi-content-copy</v-icon>
                </v-col>
                <v-col cols="12" sm="6" class="modern-item">
                  <v-icon color="#a9ce58" left>mdi-card-account-details</v-icon>
                  <span class="modern-label">Rif:</span>
                  <span class="modern-value">G200006838</span>
                  <v-icon small class="ml-2 copy-icon" @click="copyToClipboard('G200006838')">mdi-content-copy</v-icon>
                </v-col>
                <v-col cols="12" sm="6" class="modern-item">
                  <v-icon color="#d54949" left>mdi-numeric</v-icon>
                  <span class="modern-label">Código:</span>
                  <span class="modern-value">0172</span>
                  <v-icon small class="ml-2 copy-icon" @click="copyToClipboard('0172')">mdi-content-copy</v-icon>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
       <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
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
      snackbar: false,
      textmsj: "",
      color: "",
      timeout: 2000,
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
  methods: {
    copyToClipboard(value) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(value).then(() => {
          this.textmsj = "Copiado: " + value;
          this.color = "success";
          this.snackbar = true;
          this.back();
        });
      } else {
        // Fallback para navegadores antiguos
        const textarea = document.createElement('textarea');
        textarea.value = value;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('Copiado: ' + value);
      }
    },
    back() {
      setTimeout(() => {
        this.snackbar = false;
      }, 2000);
    }
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
.copy-icon {
  cursor: pointer;
  transition: color 0.2s;
}
.copy-icon:hover {
  color: #1976d2;
}
// Modern UI styles
.modern-dialog {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
.modern-card {
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  padding: 0;
}
.modern-title {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #1c3969;
  padding: 18px 24px 8px 24px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}
.modern-section {
  padding: 18px 24px 24px 24px;
}
.modern-subtitle {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  color: #1976d2;
  margin-bottom: 18px;
}
.modern-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px -4px #c3cfe2;
  margin-bottom: 12px;
  padding: 10px 14px;
}
.modern-label {
  font-weight: 600;
  color: #1c3969;
  margin-left: 8px;
}
.modern-value {
  font-weight: 400;
  color: #333;
  margin-left: 6px;
}
</style>
