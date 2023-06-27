<template>
    <div class="content-section">
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-form class="form_data_section" ref="dataForm"  lazy-validation >	
            <TitleSection :sectiontitle="sectiontitle"/>	
            <input type="hidden" v-model="dataForm.id">
            <v-row class="mt-5 p-3">
                <v-col cols="12" sm="12" md="4">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="rules"
                        v-model="empresaname"
                        readonly
                        class="ml-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Vacantes"
                        placeholder="Vacantes"
                        outlined
                        dense
                        :rules="rulesNum"
                        v-model="dataForm.cantidad_postula_oferta"
                        type="number"
                        min="0"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Experiencia"
                        placeholder="Experiencia"
                        outlined
                        dense
                        v-model="dataForm.experiencia_postula_oferta"
                        type="number"
                        min="0"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <template>
                          <v-data-table
                              :headers="headers"
                              :items="desserts" 
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
                                <span>Ver Acta de Cumplimiento</span>
                            </v-tooltip>
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
                                        color="error"
                                        dark
                                        @click="eliminar(item)"   
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
            </v-row>
        </v-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ofertModule from '@/store/modules/ofertModule';
import { ValidationObserver } from 'vee-validate'
import {serialize} from 'jsonapi-fractal'
import storageData from '@/store/services/storageService'

@Component({
  components: {

  }
})
export default class EditarCliente extends Vue {
    [x: string]: unknown;
    listPrice?: any = [];
    pricelist_id = ''
	condicionespago?: any = [];
	overlay = false;
	title : string = '';
	subtitle : string = ''
	dataForm : any = {
        arraydisc : []
    };
    sectiontitle = 'LISTADO DE POSTULANTES'

    empresaname = ''
    arrayCharges = []
    arrayProfession = []
    arrayDiscapacidades = []
    arrayChk = []   
    cargo_id = ''
    profesion_id = ''
    headers = [
        {text: 'Doc.Identificación', value: 'cedula_postula_pcd'},
        {text: 'PCD ', value: 'nombres_postula_pcd'},
        {text: 'Profesión', value: 'desc_profesion_postula'},
        {text: 'Grado Instrucción', value: 'desc_grado_instruccion_postula'},
        {text: 'Sexo', value: 'sexo'},
        {text: 'Status', value: 'status_postula_oferta_pcd'},
    ];
    desserts = []
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm
    }
    async getPostulantesAll(id){
        const postulantes : any = await  ofertModule.getPostulantesById(id);
        console.log(postulantes.data)
        this.desserts = postulantes.data;
        //this.desserts = postulantes

    }
    async getOferta(id){
        const data : any = await ofertModule.getOfertById(id)
        this.dataForm = data.data.oferts
        this.cargo_id = data.data.oferts.id_cargo_postula_oferta
        this.profesion_id = data.data.oferts.id_profesion_postula_oferta
    }

	reset () {
        this.$refs.dataForm.reset()
    }

    back() {
        setTimeout(() => {
            this.snackbar = false
            this.$router.go(-1)
        },2000);
    }
    backError() {
        setTimeout(() => {
            this.snackbar = false
        },2000);
    }
    go() {
        this.$router.go(-1)
    }

    openView(){
        this.$router.push({ name: "crearofertalaboral"});
    }

    eliminar(item){
        this.dialogDelete = true;
        this.textbody = 'Confirme que desea eliminar la Oferta'
        this.titlemodal = 'Eliminar Registro de Oferta'
        this.id_delete = item.id_postula_oferta
    }
    
    editar(item){
        this.$router.push({ name: "editarofertalaboral", params: { id: item.id_postula_oferta } });
    }

    cerrarModal(event){
        this.dialogDelete = event;
    } 
    async deleteData(event){
      
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
   
    async dataIndex(){  
        this.overlay = true
            let paginateData : any = [];
            const data : any = await ofertModule.getAll()  
            this.desserts = data.data
        this.overlay = false 
    }

    
    mounted(){
        this.getPostulantesAll(this.$route.params.id); 
        this.getOferta(this.$route.params.id)
        this.empresaname = storageData.get('_bussines').rif + '-' +storageData.get('_bussines').company_name  
        this.dataForm.id_postula_empresa = storageData.get('_bussines').id
        this.dataForm.fecha_postula_oferta = this.date
    }
	data(){
    return{
        rules: [
            (v:any) => !!v || 'Campo requerido'
        ],
		emailRules: [
			v => !!v || 'E-mail is requerido',
			v => /.+@.+/.test(v) || 'E-mail must be valid',
		], 
        numberRule: [
         
            v => v >= 0  || 'El valor debe ser mayor a cero',
            v => v <= 100  || 'El valor debe ser menor a 100'
        ],
        rulesNum: [
            v => v >= 0  || 'Campo Requerido',
        ],
        textRules: [
            (v:any) => !!v || 'Campo Requerido',
            (v:any) => /^[A-Za-z-0-9]+$/.test(v) || 'Campo No acepta caracteres especiales',
            (v:any) =>(v && v.length <= 10) ||'Debe ingresar máximo 10 caracteres'
        ],
            
        }
    };


}
</script>
<style lang="scss" scoped>
    .form_data_section{
        background: white;
        border-radius: 8px;
        width: 100%;
        padding: 20px;
    }
    .content-section{
        display: flex;
        justify-content: center;
    }
    .col-md-6{
        padding: 2px;
    }
    @media screen and (max-width:374px){
        .form_data_section{
           width: 100%;
        }
    }    
    @media screen and (min-width:375px) and (max-width:424px){
        .form_data_section{
        width: 100%;
        }   
    }   
    @media screen and (min-width:425px) and (max-width:830px){
        .form_data_section{
            width: 100%;
        }  
    }
</style>
