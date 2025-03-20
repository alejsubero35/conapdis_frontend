<template>
    <div class="content-section">
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-form class="form_data_section"  lazy-validation >	
            <TitleSection :sectiontitle="sectiontitle"/>	
            <input type="hidden" v-model="dataForm.id">
            <v-row class="mt-5">
                <v-col cols="12" sm="12" md="6">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        v-model="empresaname"
                        readonly
                        class="ml-3"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-text-field
                        label="Taller"
                        placeholder="Taller"
                        outlined
                        dense
                        v-model="tallername"
                        readonly
                        class="mr-3"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-form  ref="dataForm"  lazy-validation >	
            <v-row>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Cédula"
                        placeholder="Cédula"
                        outlined
                        dense
                        v-model="dataForm.identity_card"
                        type="number"
                        :rules="rules"
                        min="0"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Nombres"
                        placeholder="Nombres"
                        outlined
                        dense
                        v-model="dataForm.first_name"
                        :rules="rules"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Apellidos"
                        placeholder="Apellidos"
                        outlined
                        dense
                        v-model="dataForm.last_name"
                        :rules="rules"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-select
                        :items="arraySexo"
                        item-text="nombre"
                        item-value="id"
                        label="Sexo"
                        placeholder="Sexo"
                        outlined
                        dense
                        :rules="rules"
                        required
                        v-model="dataForm.sex_id"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-menu
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Fecha Nacimiento"
                            append-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                            dense 
                            outlined
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="date"
                        no-title
                        locale="es"
                        @input="menu2 = false"
                        @change="updateFecha()"
                        :rules="rules"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Edad"
                        placeholder="Edad"
                        outlined
                        dense
                        v-model="dataForm.age"
                        :rules="rules"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-select
                        :items="arraySomeDiscapacity"
                        item-text="text"
                        item-value="id"
                        label="¿Tiene alguna Discapacidad?"
                        placeholder="¿Tiene alguna Discapacidad?"
                        outlined
                        dense
                        required
                        v-model="haveDiscapacity"
                        @change="haveExistDiscapacity($event)"
                    ></v-select>
                </v-col>
                <v-col v-show="showSection" cols="12" sm="6"	md="4">
                    <v-select
                        :items="arrayDiscapacidades"
                        item-text="nombre"
                        item-value="id"
                        label="Discapacidades"
                        placeholder="Discapacidades"
                        outlined
                        dense
                        v-model="dataForm.tipo_discapacidad_id"
                    ></v-select>
                </v-col>
                <v-col v-show="showSection" cols="12" sm="6"	md="4">
                    <v-select
                        :items="arrayGradoDiscapacidad"
                        item-text="nombre"
                        item-value="id"
                        label="Grado Discapacidad"
                        placeholder="Grado Discapacidad"
                        outlined
                        dense
                        v-model="dataForm.grado_discapacidad_id"
                    ></v-select>
                </v-col>
                <v-col v-show="showSection" cols="12" sm="6"	md="4">
                    <v-text-field
                        label="N° Certificado"
                        placeholder="N° Certificado"
                        outlined
                        dense
                        v-model="dataForm.certificate_number"
                        type="number"
                        min="0"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                    <v-select
                        :items="arrayStates"
                        item-text="name"
                        item-value="id"
                        label="Estado"
                        placeholder="Estado"
                        v-model="dataForm.estado_id"
                        outlined
                        dense
                        :rules="rules"
                        required
                    ></v-select>
                </v-col>
                <!-- <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Ubicación Geográfica"
                        placeholder="Ubicación Geográfica"
                        outlined
                        dense
                        v-model="dataForm.geographic_location"
                        :rules="rules"
                    ></v-text-field>
                </v-col> -->
                <v-col cols="12" sm="6"	md="4">
                    <v-select
                        :items="tipozona"
                        item-text="text"
                        item-value="value"
                        label="Ubicación Geográfica"
                        placeholder="Ubicación Geográfica"
                        v-model="dataForm.geographic_location"
                        outlined
                        dense
                        :rules="rules"
                    ></v-select>
                </v-col>
            </v-row>
            </v-form>	
            <v-row class="d-flex justify-end mr-1">
                <v-btn @click="onSubmit"  color="primary">Añadir</v-btn>
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
                                            color="error"
                                            dark
                                            @click="deleteAttendance(item)"   
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <v-icon>mdi-delete-circle-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Eliminar Asistencia</span>
                                </v-tooltip>
                            </div>
                        </template>
                          </v-data-table>
                      </template>
                  </v-col>
            </v-row>
            <v-row>
            <v-dialog v-model="dialogDelete" max-width="380">
                <v-card>
                    <v-card-title class="text-h6 center">
                        {{ titleModalDelete }}
                    </v-card-title>
    
                    <v-card-text>
                       {{ textbody }}
                    </v-card-text>
    
                    <v-card-actions>
                        <v-spacer></v-spacer>
    
                        <v-btn
                            color="red darken-1"
                            text
                            @click="dialogDelete = false"
                        >
                            Cancelar
                        </v-btn>


                        <v-btn
                            color="green darken-1"
                            text
                            @click="deleteData()"
                        >
                            Aceptar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        </v-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import bussinesModule from '@/store/modules/bussinesModule';
import formacionModule from '@/store/modules/formacionModule';
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
  
    };
    sectiontitle = 'AGREGAR Y LISTAR ASISTENCIAS'
    empresaname = ''
    arrayDiscapacidades = []
    arrayGradoDiscapacidad = []
    arrayStates = []
    arrayChk = []   
    cargo_id = ''
    profesion_id = ''
    headers = [
        
        {text: 'Id', value: 'id'},
        {text: 'Cédula', value: 'identity_card'},
        {text: 'Nombres ', value: 'first_name'},
        {text: 'Apellidos ', value: 'last_name'},
        {text: 'Sexo', value: 'sex.nombre'},
        {text: 'Discapacidad', value: 'tipodiscapacidad.nombre'},
        {text: 'Fecha Nac.', value: 'birthdate'},
        {text: 'Edad', value: 'age'},
        {text: 'Acción', value: 'actions'},
    ];
    date = ''
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
    desserts = []
    arraySexo = []
    tallername = ''
    arraySomeDiscapacity = [
        {id: 1, text: 'Si'},
        {id: 2, text: 'No'},
    ]
    showSection = false
    haveDiscapacity = ''
    tipozona = [
        {value: 'Rural', text: 'Rural'},
        {value: 'Turistica', text: 'Turistica'},
        {value: 'Urbana', text: 'Urbana'}
    ];
    dialogDelete = false
    titleModalDelete = ''
    textbody = ''
    idDelete = ''
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm
    }
    updateFecha(){
        this.dataForm.fecha_nacimiento_formacion_solicitud_asistencia = this.date
        this.calcularEdad(this.date)
    }
    async haveExistDiscapacity(event){
        if(event == 1){
            this.showSection = true
        }else{
            this.showSection = false
        }
    }
    calcularEdad(fechaNacimiento) {
        const hoy : any = new Date();

        const fechaNac : any = new Date(fechaNacimiento);

        let diferencia = hoy - fechaNac;

        const edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));

        this.dataForm.age = edad
    }
    async getComboboxAll(){
        const sexos : any = await  formacionModule.getSexosAll();
        this.arraySexo = sexos;

        const discapacidades : any = await  formacionModule.getDiscapacidadesAll();
        this.arrayDiscapacidades = discapacidades.data;

        const gradodiscapacidad : any =  await formacionModule.getGradoDiscapacidadesAll();
        this.arrayGradoDiscapacidad = gradodiscapacidad.data;

        const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data

    }

    async getsolicitud(id){
        const {data} : any = await formacionModule.getRequestById(id)
        console.log(data)
        this.tallername = data.data.workshop.description
        this.dataForm.workshop_id = data.data.workshop.id
    }
    async onSubmit(){
        const valid :any =  this.$refs.dataForm.validate();
        if(valid){
            const data : any = await formacionModule.saveAttendance(this.FormRequest)
            if(data.code == 200 || data.code == 201){
                this.getAttendances()
                this.textmsj = 'Asistencia Creada con Éxito.'
                this.color = 'success'
                this.snackbar = true
                this.back();
                this.reset()
                this.overlay = false 
            } else {
                this.textmsj = 'Error al crear la asistencia.'
                this.color = 'error'
                this.snackbar = true
                this.backError();
                this.overlay = false 
            }
        }

    }
    async getAttendances(){
        const attendances : any = await formacionModule.getAttendancesByIdRequest(this.$route.params.id)
        this.desserts = attendances.data
        this.overlay = false
        this.dialogDelete = false
    }
    async deleteAttendance(item){
        this.dialogDelete = true
        this.titleModalDelete = 'Eliminar Asistencia'
        this.textbody = '¿Estas seguro de esta acción?'
        this.idDelete = item.id
    }
    async deleteData(){
        this.overlay = true
        const attendances : any = await formacionModule.deleteAttendances(this.idDelete)
        if(attendances.status == 200 || attendances.status == 201){
            this.getAttendances()
        }

    }
	reset () {
        this.$refs.dataForm.reset()
    }

    back() {
        setTimeout(() => {
            this.snackbar = false
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
    mounted(){
        this.getComboboxAll(); 
        if(this.$route.params.id){
            this.getsolicitud(this.$route.params.id)
            this.getAttendances()
            this.dataForm.gform_training_request_id = this.$route.params.id
            this.dataForm.birthdate = this.date
        }
  
        this.empresaname = storageData.get('_bussines').rif + '-' +storageData.get('_bussines').company_name  
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
