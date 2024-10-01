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

        <div class="title"> 
            <v-col cols="12" md="12" sm="12" xs="12">
                <h3 class="title_section">LISTADO DE SOLICITUD FORMACIÓN</h3><br>
            </v-col>
        <!--     <v-col cols="12" sm="12" md="12">
                <h3 class="title_section">SOLICITUD DE FORMACIÓN</h3><br>
            </v-col> -->
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
                <template v-slot:item.status="{item}">
                    <template class="task">
                        <v-btn :color="getColor(item.status)" dark rounded x-small>
                            {{ item.status }}
                        </v-btn>
                    </template>
                </template>
                <template v-slot:item.action="{ item }">
                    <div class="d-flex">
                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="success"
                                    dark
                                    @click="ver(item)"   
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-eye-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Ver Solicitud de Formación</span>
                        </v-tooltip>
                        <v-tooltip v-if="item.status != 'Negada'"  top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="info"
                                    dark
                                    @click="asistencias(item)"   
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-account-multiple-plus-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Ver Asistencias</span>
                        </v-tooltip>
                        <v-tooltip v-if="item.status != 'Negada'"  top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="warning"
                                    dark
                                    @click="evaluarformacion(item)"   
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-check-decagram-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Evaluar Formación</span>
                        </v-tooltip>
                        <v-tooltip v-if="item.available_download != 0" top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="error"
                                    dark
                                    @click="downloadCertificates(item)"   
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-printer</v-icon>
                                </v-btn>
                            </template>
                            <span>Descargar Certificados</span>
                        </v-tooltip>
                        
                    </div>
                </template>
                </v-data-table>
            </template>
        </v-col>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch }     from 'vue-property-decorator';
import formacionModule            from '@/store/modules/formacionModule';
import storageData from '@/store/services/storageService'


@Component({
  components: {

  }
})
export default class Usuario extends Vue {
	@Prop() item?: Object;
    headers = [
        {text: 'Id', value: 'id'},
        {text: 'Fecha ', value: 'proposed_date'},
        {text: 'Taller', value: 'workshop.description'},
        {text: 'Responsable', value: 'responsible'},
        {text: 'Cantidad', value: 'number_of_participants'},
        {text: 'Status', value: 'status'},
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
    title  : string = 'AÑADIR SOLICITUD'
    tituloModal : string = ''
    dataEditForm : object = {}
    id_delete = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    label = 'Buscar Solicitud'
    moduleStore = formacionModule
    per_page = 10
    endpoint : string = 'users'
    options = {}
    textbody = ''
    titlemodal = ''
  $router: any;

    
    getColor(item){
        if(item == 'Pendiente'){
            return 'warning'
        }else if(item == 'Negada'){
            return 'error'
        } else {
            return 'success'
        }
    }
    openView(){
        this.$router.push({ name: "crearsolicitudformacion"});
    }
    ver(item){
        this.$router.push({ name: "versolicitudformacion", params: { id: item.id } });
    }
    asistencias(item){
        this.$router.push({ name: "crearasistencia", params: { id: item.id } });    
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
    async evaluarformacion(item){
        this.$router.push({ name: "trainingevaluation", params: { id: item.id } });
    } 
    async downloadCertificates(item) {
        const data : any = await formacionModule.downloadCertificate(item.id);
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

    viewPDF(id) {
        this.$router.push({ name: "planillaboletaordenamiento", params: { id: id } });
    }
    async dataIndexRequest(){  
        this.overlay = true
        const data : any = await formacionModule.getRequestAll(storageData.get('_bussines_id'))  
        this.desserts = data.data
        this.overlay = false 
    }

    mounted(){
        this.dataIndexRequest()
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
    justify-content: center;
   
}
</style>
