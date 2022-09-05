<template>
  <div>
    <button
      v-if="deferredPrompt"
      ref="addBtn"
      class="add-button"
      @click="clickCallback"
    >
      Add To Home Screen
    </button>
  </div>
</template>

<script>
export default {
  name: 'AddToHomeScreen',
  data: () => ({
    deferredPrompt: null,
  }),
  mounted() {
   // this.captureEvent()
  },
  created() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  },
  methods: {
/*     captureEvent() {
      window.addEventListener('beforeinstallprompt', (e) => {
        // ! Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.deferredPrompt = e
      })
    }, */
/*     clickCallback() {
      // Show the prompt
      this.deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log("User accepted the A2HS prompt");
          // Call another function?
        }
        this.deferredPrompt = null
      })
    }, */
    clickCallback() {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        this.deferredPrompt = null;
      });
    }
  },
}
</script>
<style scoped>
 	.add-button {
	position: absolute;
	top: 1px;
	left: 1px;
	} 
</style>