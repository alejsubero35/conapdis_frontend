<template>
    <v-row class="principal_container">
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
            class="laoding"
        ></v-progress-circular>
        </v-overlay>
        <ButtonOpen  @openView="openView" :title="title" />
        <v-col cols="12">
            <Filtro  :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataUser"/>
        </v-col>
        <v-col cols="12">
            <DataTable :search="search" 
            :headers="headers" 
            :desserts="desserts" 
            :loading="loadTable" 
            @customChange="openView"  
            @changePassword="openViewChangePassword"  
            :title="title" 
            @edit="editarUsuario" 
            @delete="showModalDelete" 
            :moduleStore="moduleStore" 
            v-on:updateData="handleDataUser"
            :section="section"
            :endpoint="endpoint"
            />
        </v-col>
        <ModalDelete @deleteData="deleteUsuario" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop }     from 'vue-property-decorator';
import usuariosModule            from '@/store/modules/usersModule';
import {serialize} from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class Usuario extends Vue {
	@Prop() item?: Object;
    headers = [
            {text: 'Nombre Completo', value: 'name'},
            {text: 'Email', value: 'email'},
            {text: 'Acciones', value: 'action'}
            ];
    section : string = 'Usuarios'
    overlay = false;
    desserts : any = [];
    search   : String = '';
    selected : Object = [];
    loadTable  : boolean = true ;
    clientes : any = [];
    dialog : boolean = false;
    dialogDelete : boolean = false;
    title  : string = 'NUEVO USUARIO'
    tituloModal : string = ''
    dataEditForm : object = {}
    dataDeleteForm  = {
        id : '',
        deletedAt : ''
    }
    snackbar = false
    textmsj = ''
    timeout = 2000
    label = 'Buscar Usuarios'
    moduleStore = usuariosModule
    page = 1
    endpoint : string = 'users'

    get FormRequestDelete(): any {
        return serialize(this.dataDeleteForm,'users',{});
    }
    openView(){
        this.$router.push({ name: "createuser"});
    }
    openViewChangePassword(id){
        this.$router.push({ name: "updatepassword", params: { id: id,section:this.section } });
    }
    showModalDelete(id){
        this.dialogDelete = true;
        this.dataDeleteForm.id = id
        this.dataDeleteForm.deletedAt = this.currentDate()
    }
    cerrarModal(event){
        this.dialogDelete = event;
    }
     async deleteUsuario(event){
        let dataUpdate : any = []
        this.dialogDelete = event;
        this.overlay = true
     /*    const res : any = await usuariosModule.deleteUsuario(this.FormRequestDelete);
        dataUpdate = deserialize(res.data) */
        this.desserts = dataUpdate;
        this.textmsj = 'Usuario inabilitado con Éxito.'
        this.snackbar = true
        this.closeSnackbar()
        this.overlay = false
    } 
    closeSnackbar(){
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    handleDataUser(event){
        this.desserts = event;
        this.loadTable = false;
    }
    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }

    editarUsuario(id) {
        this.$router.push({ name: "edituser", params: { id: id } });
    }

}
</script>
<style lang="scss" scoped>
::v-deep .table-one {
    thead.v-data-table-header {
        tr {
            &:hover {
                background-color: #f2f3f8;
            }
            th {
                span {
                    font-size: 16px;
                    color: #304156;
                }
            }
        }
        tr {
            td {
                padding-bottom: 20px;
                padding-top: 20px;
            }
        }
    }
    tbody {
        tr {
            &:hover {
                background-color: #f2f3f8 !important;
            }
        }
    }
}
.loading{
    z-index:210;
}
.principal_container{
    background-color: white;
    padding: 15px;
    border-radius: 13px;
}
</style>
