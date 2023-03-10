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
                                        @click="viewPDF(item.id)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                </template>
                                <span>Ver Guía de Inspección</span>
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
import guiaModule            from '@/store/modules/guiaModule';


@Component({
  components: {

  }
})
export default class Usuario extends Vue {
	@Prop() item?: Object;
    headers = [
            {text: 'N° Guía', value: 'num_guia'},
            {text: 'Fecha Inspección', value: 'date_inspection'},
            {text: 'Unidad de Inspección', value: 'inspection_unit.name'},
            {text: 'Solicitud de Inspección', value: 'inspection_request.payroll_number'},
            {text: 'Empresa', value: 'busine.company_name'},
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
    title  : string = 'NUEVA GUIA INSPECCIÓN'
    tituloModal : string = ''
    dataEditForm : object = {}
    id_delete = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    label = 'Buscar Solicitud'
    moduleStore = guiaModule
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
        this.textbody = 'Confirme que desea eliminar la guia de Inspección'
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
        const res : any = await guiaModule.delete(this.id_delete);
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
    handleDataUser(event){console.log(event)
        this.desserts = event;
        this.loadTable = false;
    }
    currentDate() {
        var date = new Date();
        return  date.toISOString();
    }

    viewPDF(id) {
        this.$router.push({ name: "planillaguiainspeccion", params: { id: id } });
    }
    async dataIndex(){  
    
        this.overlay = true
            let paginateData : any = [];
            const {data,status} : any = await guiaModule.getAll()   
            this.desserts = data.data
        this.overlay = false 
    }
    async setQueryPage(page:number){
        console.log(page)
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
</style>
