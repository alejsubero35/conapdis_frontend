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
            <v-row class="mt-5 p-3">
                <v-col cols="12" sm="12" md="4">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="rules"
                        v-model="empresaname"
                        :disabled="disabled"
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
                        v-model="cantidad_postula_oferta"
                        :disabled="disabled"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Experiencia"
                        placeholder="Experiencia"
                        outlined
                        dense
                        v-model="experiencia_postula_oferta"
                        :disabled="disabled"
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
                          <template v-slot:item.actions="{ item }">

                        <div class="d-flex">
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="success"
                                        dark
                                        @click="downloadCV(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-file-download-outline</v-icon>
                                    </v-btn>
                                </template>
                                <span>Descargar CV</span>
                            </v-tooltip>
                            <v-tooltip top>
                                <template v-slot:activator="{on, attrs}">
                                    <v-btn
                                        color="warning"
                                        dark
                                        @click="getCita(item)"   
                                        icon
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <v-icon>mdi-briefcase-plus</v-icon>
                                    </v-btn>
                                </template>
                                <span>Obtener Cita</span>
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
        <v-dialog
            v-model="dialogCita" max-width="700">
            <v-card>
                <v-overlay :value="overlayDialog">
                    <v-progress-circular
                        indeterminate
                        size="44"
                        class="laoding"
                    ></v-progress-circular>
                </v-overlay>
            <v-card-title class="text-h5">
                Realizar Cita 
            </v-card-title>
            <v-form class="form_data_section" ref="dataFormCita"  lazy-validation >	
                <v-row>
                <v-col cols="12" sm="12"	md="12" class="p-0">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="rules"
                        v-model="empresaname"
                        :disabled="disabled"
                  
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                     <v-text-field
                        label="Profesión"
                        placeholder="Profesión"
                        v-model="profesion"
                        outlined
                        dense
                        :disabled="disabled"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-select
                        :items="arrayCharges"
                        item-text="desc_cargo_postula"
                        item-value="id_cargo_postula"
                        label="Cargo"
                        placeholder="Cargo"
                        outlined
                        dense
                    ></v-select>
                </v-col>
        
                <v-col cols="12" sm="6" md="6">
                    <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Fecha"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            v-bind="attrs"
                            v-on="on"
                            dense 
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        no-title
                        locale="es"
                        @input="menu = false"
                        @change="updateFecha()"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Hora Inicio"
                        placeholder="Hora Inicio"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataFormCita.hora_cita_oferta_pcd"
                        type="time"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Contacto"
                        placeholder="Contacto"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataFormCita.contacto_cita_oferta_pcd"
                        type="text"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        label="Teléfono"
                        placeholder="Teléfono"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataFormCita.telefono_cita_oferta_pcd"
                        type="number"
                        min="0"
                        max="11"
                    ></v-text-field>
                </v-col>
                </v-row>
                <v-row v-show="existCita">
                    <v-col cols="12" sm="12" md="12" class="p-0">
                        <v-textarea
                            label="Gestión"
                            placeholder="Gestión"
                            outlined
                            dense
                            v-model="dataFormCita.gestion_cita_oferta_pcd"
                            rows="2"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="12" md="12" class="p-0">
                        <v-textarea
                            label="Acuerdos"
                            placeholder="Acuerdos"
                            outlined
                            dense
                            v-model="dataFormCita.acuerdos_cita_oferta_pcd"
                            rows="2"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-form>
    
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="danger" small @click="dialogCita = false">
                    Cancelar
                </v-btn>
                <v-btn color="primary" small @click="saveCita()">
                    Guardar
                </v-btn>
            </v-card-actions>
            </v-card>
	  </v-dialog>
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
    overlayDialog = false
	title : string = '';
	subtitle : string = ''
	dataFormCita : any = {

    };

    sectiontitle = 'LISTADO DE POSTULANTES'
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
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
         {text: 'Acciones', value: 'actions'}
    ];
    desserts = []
    dialogCita = false
    profesion = ''
    disabled = true
    cantidad_postula_oferta = ''
    experiencia_postula_oferta = ''
    existCita = false
	$refs!: {
        dataFormCita: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataFormCita
    }
    async getPostulantesAll(id){
        const postulantes : any = await  ofertModule.getPostulantesById(id);
        this.desserts = postulantes.data;
        //this.desserts = postulantes

    }
    async getOferta(id){
        this.dataFormCita.id_postula_oferta = id
        const data : any = await ofertModule.getOfertById(id)
        this.cantidad_postula_oferta = data.data.oferts.cantidad_postula_oferta
        this.experiencia_postula_oferta = data.data.oferts.experiencia_postula_oferta
    }

	reset () {
        this.$refs.dataFormCita.reset()
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
    
    getCita(item){console.log(item)
        this.dataFormCita.id_postula_pcd = item.id_pcd_postula_pcd
        this.profesion = item.desc_profesion_postula
        this.dialogCita = true 
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

    downloadCV(item) {
        this.$router.push({ name: "downloadcv", params: { id: item.id_pcd_postula_pcd } });
    }
   
    async dataIndex(){  
        this.overlay = true
            let paginateData : any = [];
            const data : any = await ofertModule.getAll()  
            this.desserts = data.data
        this.overlay = false 
    }
    async comboboxAll(){
        const charges : any = await  ofertModule.getCharges();
        this.arrayCharges = charges.data
        const profession : any = await ofertModule.getprofession();
        this.arrayProfession = profession.data
    }
    async updateFecha(){
        this.dataFormCita.fecha_cita_oferta_pcd = this.date
    }
    async saveCita(){
        const valid :any =  this.$refs.dataFormCita.validate();
        if(valid){
            console.log(this.FormRequest)
        }
    }
    mounted(){
        this.getPostulantesAll(this.$route.params.id); 
        this.getOferta(this.$route.params.id)
        this.comboboxAll(); 
        this.empresaname = storageData.get('_bussines').rif + '-' +storageData.get('_bussines').company_name  
        this.dataFormCita.fecha_cita_oferta_pcd = this.date
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
