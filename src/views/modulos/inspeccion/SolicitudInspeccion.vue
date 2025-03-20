<template>
    <v-row class="principal_container">
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
            class="laoding"
        ></v-progress-circular>
        </v-overlay>
        <div class="title"> 
            <v-col cols="12" sm="12" md="12">
                <h3 class="title_section">SOLICITUDES DE INSPECCIÓN</h3><br>
            </v-col>
        </div>
     <!--    <v-col cols="12">
            <Filtro  :endpoint="endpoint" :headers="headers"  :label="label" :moduleStore="moduleStore" v-on:updateData="handleDataUser"/>
        </v-col> -->
        <v-col cols="12">
          <template>
                <v-data-table
                    :headers="headers"
                    :items="desserts" 
                    :options.sync="options"
                    :itemsPerPage="per_page"
                    :footer-props="{
                        'items-per-page-text':'Filtro por Página'       
                    }"                     
                >
                    <template v-slot:item.action="{ item }">
                        <div class="d-flex">
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="success"
                                        dark
                                        @click="viewRequest(item.id)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver Solicitud</span>
                            </v-tooltip>
                        </div>
                    </template>
                    <template   v-slot:item.price="{item}">
                        <template>
                            {{ setDecimales(item.price) }}
                        </template>
                    </template>
                    <template   v-slot:item.quantity="{item}">
                        <template>
                            {{ setDecimales(item.quantity) }}
                        </template>
                    </template>
                </v-data-table>
            </template>
        </v-col>
        <ModalDelete @deleteData="deleteInspeccion" :titlemodal="titlemodal" :textbody="textbody" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch }     from 'vue-property-decorator';
import inspeccionModule            from '@/store/modules/inspeccionModule';


@Component({
  components: {

  }
})
export default class Usuario extends Vue {
	@Prop() item?: Object;
    headers = [
            {text: 'N° Expediente', value: 'payroll_number'},
            {text: 'Nómina', value: 'file_number'},
            {text: 'Estado', value: 'state.name'},
            {text: 'Municipio', value: 'municipality.name'},
            {text: 'Parroquia', value: 'parishe.name'},
            {text: 'Unidad de Inspección', value: 'inspection_unit.name'},
            {text: 'Empresa', value: 'bussine.company_name'},
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
    title  : string = 'NUEVA SOLICITUD'
    tituloModal : string = ''
    dataEditForm : object = {}
    id_delete = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    label = 'Buscar Solicitud'
    moduleStore = inspeccionModule
    per_page = 10
    endpoint : string = 'users'
    options = {}
    textbody = ''
    titlemodal = ''
    @Watch('options', { immediate: false })
        handler (val) {
        if (val.page != 1) {
            this.dataIndex()
        }
    }
    

    openView(){
        this.$router.push({ name: "createuser"});
    }

    Delete(id){
        this.dialogDelete = true;
        this.textbody = 'Confirme que desea eliminar la solicitud'
        this.titlemodal = 'Eliminar Registro de Solicitud'
        this.id_delete = id
    }
    cerrarModal(event){
        this.dialogDelete = event;
    }
     async deleteInspeccion(event){
/*         let dataUpdate : any = []
        this.dialogDelete = event;
        //this.overlay = true
        const res : any = await inspeccionModule.delete(this.id_delete);
        console.log(res.data.data)
        dataUpdate = res.data.data
        this.desserts = dataUpdate;
        this.textmsj = 'Usuario Eliminado con Éxito.'
        this.snackbar = true
        this.closeSnackbar()
        this.overlay = false */
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

    viewRequest(id) {
        this.$router.push({ name: "planillasolicitud", params: { id: id } });
    }
    async dataIndex(){  
    
        this.overlay = true
            let paginateData : any = [];
            const {data,status} : any = await inspeccionModule.getAll()   
            this.desserts = data.data
        this.overlay = false 
    }
    async setQueryPage(page:number){
 
    }
    mounted(){
        this.dataIndex()
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
    margin: 0;
}
.title{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    padding: 20px;
}
</style>
