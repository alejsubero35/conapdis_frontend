<template>
    <div>
        <v-snackbar
        v-model="localOpen"
        @input="onInput"
        :timeout="timeout"
        :color="color"
        bottom
        >{{ textmsj }}
        </v-snackbar>
     
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component
export default class Notificaciones extends Vue {
    @Prop() snackbar : boolean = false;
    @Prop() textmsj : string  = '';
    @Prop() color : string  = '';
    @Prop({ default: 3500 }) timeout!: number
    localOpen: boolean = false

    mounted(){
        this.localOpen = !!this.snackbar
    }
    @Watch('snackbar')
    watchSnackbar(val: boolean){
        this.localOpen = !!val
    }
    onInput(val: boolean){
        this.localOpen = !!val
        this.$emit('update:snackbar', this.localOpen)
        this.$emit('change', this.localOpen)
    }
}
</script>