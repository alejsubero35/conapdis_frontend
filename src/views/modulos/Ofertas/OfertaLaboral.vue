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
                <h3 class="title_section">LISTADO DE OFERTAS LABORALES</h3><br>
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
                    <template v-slot:item.action="{ item }">
                        <div class="d-flex">
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="success"
                                        dark
                                        @click="editar(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-eye-circle</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver Oferta</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="primary"
                                        dark
                                        @click="postulantes(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-account-group-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver Postulantes</span>
                            </v-tooltip>
                            <v-tooltip v-if="item.status_postula_oferta != 'CERRADA'" top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                    
                                        color="warning"
                                        dark
                                        @click="cerrarOferta(item,0)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-account-multiple-remove</v-icon>
                                    </v-btn>
                                </template>
                                <span>Cerrar Oferta</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="error"
                                        dark
                                        @click="eliminar(item,1)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Eliminar</span>
                            </v-tooltip>
                        </div>
                    </template>
                </v-data-table>
            </template>
        </v-col>
        <ModalDelete @deleteData="deleteData" :titlemodal="titlemodal" :textbody="textbody" :dialogDelete="dialogDelete" @cerrarModal="cerrarModal"/>
        <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
    </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch }     from 'vue-property-decorator';
import ofertModule from '@/store/modules/ofertModule';


@Component({
  components: {

  }
})
export default class Usuario extends Vue {
	@Prop() item?: Object;
    headers = [
            {text: 'Id', value: 'id_postula_oferta'},
            {text: 'Fecha ', value: 'fecha_postula_oferta'},
            {text: 'Cargo', value: 'desc_cargo_postula'},
            {text: 'Cantidad', value: 'cantidad_postula_oferta'},
            {text: 'Postulados', value: 'cantidad_postula_oferta'},
            {text: 'Profesión', value: 'desc_profesion_postula'},
            {text: 'Status', value: 'status_postula_oferta'},
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
    title  : string = 'AÑADIR OFERTA'
    tituloModal : string = ''
    dataEditForm : object = {}
    id_delete = ''
    id_cerrar_oferta = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    label = 'Buscar Solicitud'
    moduleStore = ofertModule
    per_page = 10
    endpoint : string = 'users'
    options = {}
    textbody = ''
    titlemodal = ''
    validateAction : any = ''
    disabled        = false
    @Watch('options', { immediate: false })
        handler (val) {
        if (val.page != 1) {
            this.dataIndex()
        }
    }
    

    openView(){
        this.$router.push({ name: "crearofertalaboral"});
    }

    eliminar(item,value){
        this.validateAction = value
        this.dialogDelete = true;
        this.textbody = 'Confirme que desea eliminar la Oferta'
        this.titlemodal = 'Eliminar Registro de Oferta'
        this.id_delete = item.id_postula_oferta
    }
    cerrarOferta(item,value){
        this.validateAction = value
        this.dialogDelete = true;
        this.textbody = 'Confirme que desea Cerrar la Oferta'
        this.titlemodal = 'Cerrar Oferta Laboral'
        this.id_cerrar_oferta = item.id_postula_oferta
    }
    editar(item){
        this.$router.push({ name: "editarofertalaboral", params: { id: item.id_postula_oferta } });
    }

    cerrarModal(event){
        this.dialogDelete = event;
    }
    async deleteData(event){
        if(this.validateAction == 0){
            this.cerrarOfert(false)
        }else{
            this.deleteOfert(false)
        }
    }
    async deleteOfert(event){
      
        this.overlay = true
        const res : any = await ofertModule.delete(this.id_delete);
        if(res.status == 200){
            this.dialogDelete = event;
            this.dataIndex()
            this.color = 'success'
            this.textmsj = 'Usuario Eliminado con Éxito.'
            this.snackbar = true
            this.closeSnackbar()
            this.overlay = false
        }
    }
     async cerrarOfert(event){
      
        this.overlay = true
        console.log( this.id_cerrar_oferta )
        const res : any = await ofertModule.cerrarOferta(this.id_cerrar_oferta);
        if(res.status == 200){
            this.dialogDelete = event;
            this.dataIndex()
            this.color = 'success'
            this.textmsj = 'Oferta Cerrar con Éxito.'
            this.snackbar = true
            this.closeSnackbar()
            this.overlay = false
        }
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
    postulantes(item){
        this.$router.push({ name: "verpostulantesoferta", params: { id: item.id_postula_oferta } });
        
    }
    async dataIndex(){  
        this.overlay = true
            let paginateData : any = [];
            const data : any = await ofertModule.getAll()  
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
    justify-content: center;
   
}
</style>
