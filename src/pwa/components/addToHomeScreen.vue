<template>
  <v-dialog v-model="showModal" persistent max-width="400">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Instala la App
      </v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="3">
            <v-avatar size="48">
              <img src="/images/icons/icon512_rounded.png" alt="App Icon" />
            </v-avatar>
          </v-col>
          <v-col cols="9">
            <div class="font-weight-medium mb-2">Agrega Conapdis a tu pantalla principal</div>
            <div class="text--secondary" style="font-size: 0.95em;">
              Disfruta de acceso rápido y funcionalidad offline.
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="clickCallback">
          Instalar
        </v-btn>
        <v-btn text color="grey" @click="closeModal">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'AddToHomeScreen',
  data: () => ({
    deferredPrompt: null,
    showModal: false,
  }),
  created() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.showModal = true;
    });
  },
  methods: {
    clickCallback() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("User accepted the A2HS prompt");
          } else {
            console.log("User dismissed the A2HS prompt");
          }
          this.deferredPrompt = null;
          this.showModal = false;
        });
      }
    },
    closeModal() {
      this.showModal = false;
    }
  },
}
</script>

<style scoped>
.v-card-title {
  justify-content: center;
  font-size: 1.2em;
}
.font-weight-medium {
  font-weight: 500;
}
</style>