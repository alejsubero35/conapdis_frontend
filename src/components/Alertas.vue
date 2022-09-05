<template>
    <div>
        <v-dialog v-model="dialogOpen" max-width="350">
            <v-card>
                <v-card-title class="text-h5">
                    Notificación
                </v-card-title>
                <v-card-text>
                    {{data}} 
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="cerrarModal()"
                    >
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
@Component({
  components: {

  }
})
export default class Alertas extends Vue {
    @Prop() dialogOpen?: Boolean;
     @Prop() data?: Boolean;
    cerrarModal(){
        this.$emit('cerrarModal',false)
    }
}

</script>