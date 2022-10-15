<template>
    <div>
        <v-dialog v-model="dialogDelete" max-width="350">
            <v-card>
                <v-card-title class="text-h6">
                    {{ titlemodal }}
                </v-card-title>

                <v-card-text>
                   {{ textbody }}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                        color="red darken-1"
                        text
                        @click="cerrarModal()"
                    >
                        Cancelar
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="deleteContact()"
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
export default class ButtonOpen extends Vue {
    @Prop() dialogDelete?: Boolean;
    @Prop() textbody?: ' Estas seguro de eliminar el Registro?';
    @Prop() titlemodal?: ' Estas seguro de eliminar el Registro?';
    
    deleteContact(){
        this.$emit('deleteData',false)
    }
    cerrarModal(){
        this.$emit('cerrarModal',false)
    }
}

</script>