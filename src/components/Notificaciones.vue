<template>
    <div>
        <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :color="color"
        bottom
        >{{ textmsj }}
        </v-snackbar>
     
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
@Component
export default class Notificaciones extends Vue {
	@Prop() snackbar : boolean = false;
    @Prop() textmsj : string  = '';
    @Prop() color : string  = '';
    timeout = 3500


}
</script>