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
                <v-col cols="12" sm="6"	md="6">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        v-model="empresaname"
                        readonly
                        class="ml-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-select
                        :items="workshops"
                        item-text="desc_formacion_taller"
                        item-value="id_formacion_taller"
                        label="Taller"
                        placeholder="Taller"
                        v-model="dataForm.id_formacion_taller"
                        outlined
                        dense
                        :rules="rulesNum"
                        required
                        class="mr-2"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="4"	md="4">
                    <v-text-field
                        label="Responsable Solicitud"
                        placeholder="Responsable Solicitud"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.responsable_formacion_solicitud"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field
                        label="Teléfono Responsable Solicitud"
                        placeholder="Teléfono Responsable Solicitud"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.telefono_formacion_solicitud"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4"	md="4">
                    <v-text-field
                        label="Cantidad Participantes"
                        placeholder="Cantidad Participantes"
                        outlined
                        dense
                        :rules="rulesNum"
                        v-model="dataForm.cantidad_formacion_solicitud"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-select
                        :items="arrayStates"
                        item-text="name"
                        item-value="id"
                        label="Estado"
                        placeholder="Estado"
                        v-model="dataForm.id_estado_formacion_solicitud"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="getMunicipalityByState($event)"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-select
                        :items="arrayMunicipality"
                        item-text="name"
                        item-value="id"
                        label="Municipio"
                        placeholder="Municipio"
                        v-model="dataForm.id_municipio_formacion_solicitud"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="getParishesByMunicipality($event)"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-select
                        :items="arrayParishes"
                        item-text="name"
                        item-value="id"
                        label="Parroquia"
                        placeholder="Parroquia"
                        v-model="dataForm.id_parroquia_formacion_solicitud"
                        outlined
                        dense
                        :rules="rules"
                        required
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
                            label="Fecha Prop. Formación"
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
                        ></v-date-picker>
                    </v-menu>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field
                        label="Hora Inicio"
                        placeholder="Hora Inicio"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.hora_inicio_formacion_solicitud"
                        type="time"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-text-field
                        label="Hora fin"
                        placeholder="Hora fin"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.hora_final_formacion_solicitud"
                        type="time"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                    <v-textarea
                        label="Dirección"
                        placeholder="Dirección"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.direccion_formacion_solicitud"
                        rows="3"
                    ></v-textarea>
                </v-col>				
 
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Punto de Referencia"
                        placeholder="Punto de Referencia"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.pto_referencia_formacion_solicitud"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-select
                        :items="tipozona"
                        item-text="text"
                        item-value="value"
                        label="Tipo de Zona"
                        placeholder="Tipo de Zona"
                        v-model="dataForm.zona_formacion_solicitud"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="setItem()"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center p-5">
                <v-btn @click="onSubmit"  color="primary" small>Guardar</v-btn>
            </v-row>
        </v-form>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <!-- <ModalApproved @confirm="confirm" :titleModalDelete="titleModalDelete" :textbody="textbody" :dialogDelete="openDialog" @cerrarModal="cerrarModal"/> -->
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import formacionModule from '@/store/modules/formacionModule';
import bussinesModule from '@/store/modules/bussinesModule';
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

    tipozona = [
        {value: 'Rural', text: 'Rural'},
        {value: 'Turistica', text: 'Turistica'},
        {value: 'Urbana', text: 'Urbana'}
    ];

    btName = 'Guardar'
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'AÑADIR SOLICITUD DE FORMACIÓN'
    dialog = false
    openDialog = false
    textbody = ''
    titleModalDelete = ''
    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
    workshops = []
    arrayStates = []
	arrayMunicipality = []
	arrayParishes = []
    empresaname = ''
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm;
    }

    updateFecha(){
        this.dataForm.fecha_propuesta_formacion_solicitud = this.date
    }
	onSubmit() {
        console.log(this.FormRequest)
        const valid :any =  this.$refs.dataForm.validate();

        if (valid) {
            this.save();
        }else {
            this.dialog = true
        } 
		
    }
 	async save() {
 		this.overlay = true
    	const data = await formacionModule.save(this.FormRequest)
       
        if(data.code == 200 || data.code == 201){
            this.textmsj = 'solicitud de Formación Creada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			this.overlay = false 
        } else {
            this.textmsj = 'Error al crear la Solicitud.'
            this.color = 'error'
            this.snackbar = true
            this.backError();
            this.overlay = false 
        }
	
    }; 
    cerrarModal(event){
        this.openDialog = event;
        this.reset();
        this.textmsj = 'Cliente Creado con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
        this.overlay = false 
    }
    async comboboxAll(){
        const typeWorkshops : any = await  formacionModule.getWorkshopsAll();
        this.workshops = typeWorkshops.data
    }
    async getStates(){
		const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data
	}
	async getMunicipalityByState(event){
		const municipality : any = await bussinesModule.getMunicipality(event)
		this.arrayMunicipality = municipality.data.data
	}
	async getParishesByMunicipality(event){
		const parishes : any = await bussinesModule.getParishes(event)
		this.arrayParishes = parishes.data.data
		this.overlay = false
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
    mounted(){
        this.comboboxAll(); 
        this.getStates()
        this.dataForm.id_postula_empresa = storageData.get('_bussines').id  
        this.empresaname = storageData.get('_bussines').rif + '-' +storageData.get('_bussines').company_name
        this.dataForm.fecha_formacion_solicitud = this.date
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
    setItem(){

    }

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
