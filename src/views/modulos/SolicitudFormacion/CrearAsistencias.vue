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
                        v-model="dataForm.cedula_formacion_solicitud_asistencia"
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
                        v-model="dataForm.nombre_formacion_solicitud_asistencia"
                        :rules="rules"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Apellidos"
                        placeholder="Apellidos"
                        outlined
                        dense
                        v-model="dataForm.apellido_formacion_solicitud_asistencia"
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
                     
                        v-model="dataForm.sexo_formacion_solicitud_asistencia"
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
                    <v-select
                        :items="arrayDiscapacidades"
                        item-text="nombre"
                        item-value="id"
                        label="Discapacidades"
                        placeholder="Discapacidades"
                        outlined
                        dense
                        :rules="rules"
                        required
                     
                        v-model="dataForm.id_discapacidad_formacion_solicitud_asistencia"
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
        </v-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ofertModule from '@/store/modules/ofertModule';
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
    arrayChk = []   
    cargo_id = ''
    profesion_id = ''
    headers = [
        
        {text: 'Id', value: 'id_formacion_solicitud_asistencia'},
        {text: 'Cédula', value: 'cedula_formacion_solicitud_asistencia'},
        {text: 'Nombres ', value: 'nombre_formacion_solicitud_asistencia'},
        {text: 'Apellidos ', value: 'apellido_formacion_solicitud_asistencia'},
        {text: 'Sexo', value: 'sexo'},
        {text: 'Discapacidad', value: 'disc'},
        {text: 'Fecha Nac.', value: 'fecha_nacimiento_formacion_solicitud_asistencia'},
        {text: 'Acción', value: 'actions'},
    ];
    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
    desserts = []
    arraySexo = []
    tallername = ''
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm
    }
    updateFecha(){
        this.dataForm.fecha_nacimiento_formacion_solicitud_asistencia = this.date
    }
    async getComboboxAll(){
        const sexos : any = await  ofertModule.getSexosAll();
        this.arraySexo = sexos.data;
        const discapacidades : any = await  ofertModule.getDiscapacidadesAll();
        this.arrayDiscapacidades = discapacidades.data;

    }
    async getsolicitud(id){
        const data : any = await formacionModule.getRequestById(id)
        this.tallername = data.data.taller
    }
    async onSubmit(){
        const valid :any =  this.$refs.dataForm.validate();
        if(valid){
            const data : any = await formacionModule.saveAttendance(this.FormRequest)
            if(data.code == 200 || data.code == 201){
                this.getAttrendances()
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
    async getAttrendances(){
        const attendances : any = await formacionModule.getAttendancesByIdRequest(this.$route.params.id)
        this.desserts = attendances.data
        this.overlay = false
    }
    async deleteAttendance(item){
        this.overlay = true
        const attendances : any = await formacionModule.deleteAttendances(item.id_formacion_solicitud_asistencia)
        if(attendances.status == 200 || attendances.status == 201){
            this.getAttrendances()
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
            this.getAttrendances()
            this.dataForm.id_formacion_solicitud = this.$route.params.id
            this.dataForm.fecha_nacimiento_formacion_solicitud_asistencia = this.date
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
