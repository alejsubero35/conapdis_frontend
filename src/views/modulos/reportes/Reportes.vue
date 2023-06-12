<template>
    <div>
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
   
            <div class="formCliente">
   		<TitleSection :sectiontitle="sectiontitle"/>
           <v-tabs>
                <v-tab>PERSONAS CON DISCAPACIDAD</v-tab>
                <v-tab @click="getPersonLinked()">EMPRESAS REGISTRADAS</v-tab>
     
                <v-tab-item>
                    <v-container fluid>
                        <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
                            <input type="hidden" v-model="vincularform.id" value:any="0" >					
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                        :items="arrayStates"
                                        item-text="name"
                                        item-value="id"
                                        label="Estado"
                                        placeholder="Estado"
                                        dense
                                        :rules="rules"
                                        required
                                        @change="getMunicipalityByState($event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                        :items="arrayMunicipality"
                                        item-text="name"
                                        item-value="id"
                                        label="Municipio"
                                        placeholder="Municipio"
                                        dense
                                        :rules="rules"
                                        required
                                        @change="getParishesByMunicipality($event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                        :items="arrayParishes"
                                        item-text="name"
                                        item-value="id"
                                        label="Parroquia"
                                        placeholder="Parroquia"
                                        dense
                                        :rules="rules"
                                        required
                                        @change="getParishesId($event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                        :items="arraySex"
                                        item-text="name"
                                        item-value="id"
                                        label="Sexo"
                                        placeholder="Sexo"
                                        v-model="dataFilter.sexo_id"
    
                                        dense
                                        :rules="rules"
                                        required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
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
                                            v-model="dateD"
                                            label="Desde"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            dense 
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="dateD"
                                        no-title
                                        locale="es"
                                        @input="menu = false"
                                        @change="updateFecha()"
                                        ></v-date-picker>
                                    </v-menu>
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
                                            v-model="dateH"
                                            label="Hasta"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            dense 
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="dateH"
                                        no-title
                                        locale="es"
                                        @input="menu2 = false"
                                        @change="updateFechaHasta()"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex justify-end">
                                <v-btn @click="onSubmit" class="mr-3" > <v-icon>mdi-account-search-outline</v-icon> Buscar</v-btn>
                                <!-- <v-btn v-if="desserts.length > 0" @click="onSubmit" color="success" > <v-icon>mdi-microsoft-excel</v-icon> Descargar Excel</v-btn> -->
                                <v-btn v-if="desserts.length > 0" color="success">
                                    <v-icon>mdi-microsoft-excel</v-icon>
                                    <export-json-excel
                                        :data="exportData"
                                        :fields="fields"
                                        name="filename"
                                        :beforeExport="startDownload"
                                        target="_blank"
                                        >
                                        Descargar Excel 
                                    </export-json-excel>
                                </v-btn>
                            </v-row>
                            <v-row>
                                <v-col  cols="12" sm="12" md="12" class="p-0 mt-4">
                                    <template>
                                        <v-data-table
                                            :headers="headers"
                                            :items="desserts" 
                                            class="elevation-1"  
                                            no-data-text="No hay datos disponibles"  
                                            :footer-props="{
                                                'items-per-page-options': [5, 10 -1],
                                                'items-per-page-text':'Filtro por Página'
                                                
                                            }"           
                                        >
                                        </v-data-table>
                                    </template>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container fluid>
                        <v-form class="formCliente" ref="validateStepFormTwo"  lazy-validation >	
                            <input type="hidden" v-model="vincularform.id" value:any="0" >
                            <v-row>
                                <v-col cols="12" sm="6" md="3">
                                    <v-select
                                        :items="arrayStates"
                                        item-text="name"
                                        item-value="id"
                                        label="Estado"
                                        placeholder="Estado"
                                        dense
                                        :rules="rules"
                                        required
                                        @change="getMunicipalityByState($event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="3">
                                    <v-select
                                        :items="arrayMunicipality"
                                        item-text="name"
                                        item-value="id"
                                        label="Municipio"
                                        placeholder="Municipio"
                                        dense
                                        :rules="rules"
                                        required
                                        @change="getParishesByMunicipality($event)"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="3">
                                    <v-menu
                                        v-model="menu3"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateD"
                                            label="Desde"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            dense 
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="dateD"
                                        no-title
                                        locale="es"
                                        @input="menu3 = false"
                                        @change="updateFecha()"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="12" sm="6" md="3">
                                    <v-menu
                                        v-model="menu4"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="dateH"
                                            label="Hasta"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            dense 
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                        v-model="dateH"
                                        no-title
                                        locale="es"
                                        @input="menu4 = false"
                                        @change="updateFechaHasta()"
                                        ></v-date-picker>
                                    </v-menu>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-tab-item>
           </v-tabs>
        </div>
    	<Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
		<v-dialog
		v-model="dialog" max-width="400">
		<v-card>
		  <v-card-title class="text-h5">
			Desvincular Persona 
		  </v-card-title>
          <v-card-body>
            <v-col cols="12" sm="12" md="12">
                <v-textarea
                label="Motivo"
                placeholder="Motivo"
                outlined
                dense
                v-model="desvincularform.motivo"
                rows="2"
            ></v-textarea>
            </v-col>
		  </v-card-body>
  
		  <v-card-actions>
			<v-spacer></v-spacer>
  
			<v-btn
			  color="danger"
			  text
			  @click="dialog = false"
			>
			  Cancelar
			</v-btn>
  
			<v-btn
			  color="primary"
			  text
			  @click="desvincular()"
			>
			  Desvincular
			</v-btn>
		  </v-card-actions>
		</v-card>
	  </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import bussinesModule from '@/store/modules/bussinesModule';
import globalModule from '@/store/modules/globalModule';
import sessionModule from '@/store/modules/sessionModule';
import { ValidationObserver } from 'vee-validate'
import storageData from '@/store/services/storageService'
import "export-json-excel";


@Component({
  components: {

  }
})
export default class Bussines extends Vue {
[x: string]: unknown;
	overlay = false;
	title : string = '';
	subtitle : string = ''
	validateStepForm : any = {inactivo: '1'};
    arrayPosition = []
    vincularform : any = { 
		code: 0, 
		message:'', 
	}
    desvincularform : any = { 
		code: 0, 
		message:'', 
	}
    loadingWizard = false

    agente_retencion = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'Reportes Generales'
    dialog = false
    tabIndex = 0
	dateD = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    dateH = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu : boolean = false
    menu2 : boolean = false
    menu3 : boolean = false
    menu4 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
  
    headers = [
        {text: 'Id', value: 'id'},
        {text: 'Cédula', value: 'cedula'},
        {text: 'Nombres', value: 'nombres'},
        {text: 'Apellidos', value: 'apellidos'},
    ];
    desserts        = []
    searchTerm      = ""
    isLoading       = false;
    arrayStates = []
    arrayMunicipality = []
    arrayParishes = []
    arraySex = [
        {
            id:1,
            name:'Masculino',
        },
        {
            id:3,
            name:'Femenino'
        },
    ]
     dataFilter = {
        state_id        : '',
        municipality_id : '',
        parishe_id      : '',
        fecha_desde     : '',
        fecha_hasta     : '',
        sexo_id         : ''
     }   
    exportData = []
    fields = [
            {
              'title': 'Cédula',
              'name': 'cedula', 
            },
            {
              'title': 'Nombres',
              'name': 'nombres', 
            },
            {
              'title': 'Apellidos',
              'name': 'apellidos', 
            }
        ]
	$refs!: {
        validateStepForm: InstanceType<typeof ValidationObserver>;
        validateStepFormTwo: InstanceType<typeof ValidationObserver>;			
	}

	get FormRequest(): any {
        return this.dataFilter;
    }
    get FormRequestDesvincular(): any {
        return this.desvincularform;
    }
    get activo() {
        return this.validateStepForm.inactivo = '1'
    }
    setLoading(value) {
       this.loadingWizard = value
   }
    handleValidation(isValid, tabIndex){
        console.log('Tab: '+tabIndex+ ' valid: '+isValid)
    }
	async updateFecha(){
		this.dataFilter.fecha_desde = this.dateD
	}
    async updateFechaHasta(){
        this.dataFilter.fecha_hasta = this.dateH
    }

	
	onSubmit() {console.log(this.FormRequest)
        this.filter()
    }
 	async filter() { 
        this.overlay = true
    	const data = await globalModule.searchFilter(this.FormRequest)
		console.log(data)
		if(data.data.length > 0){
            this.exportData = data.data
            this.desserts = data.data
			this.overlay = false 
		} else {
			this.textmsj = 'No se encontraron registros.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		}
    }; 
    startDownload(){
        //window.preventDefault();
    }
    openDialog(item){
        this.dialog     = true
        this.desvincularform.id = item.id
        this.desvincularform.trabajo_hasta = this.dategreso
    }

	reset () {
        this.$refs.validateStepForm.reset()
    };
    back() {
        setTimeout(() => {
			this.tabIndex = 0
            this.snackbar = false
        },2000);
    }
	backError(){
		setTimeout(() => {
            this.snackbar = false
        },3500);
	}
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
    }
    async getStates(){
		const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data
	}
	async getMunicipalityByState(event){
		const municipality : any = await bussinesModule.getMunicipality(event)
		this.arrayMunicipality = municipality.data.data
        this.dataFilter.state_id = event
       // this.filter()
	}
	async getParishesByMunicipality(event){
		const parishes : any = await bussinesModule.getParishes(event)
		this.arrayParishes = parishes.data.data
		this.dataFilter.municipality_id = event
       // this.filter()
	}
    async getParishesId(event){
        this.dataFilter.parishe_id = event
    }
    mounted(){
        this.getStates()
        this.formatDate(this.date)
        this.vincularform.trabaja_desde = this.date
    }
	data(){
    return{
		show:false,
        rules: [
            (v:any) => !!v || 'Campo requerido'
        ],
		emailRules: [
			v => !!v || 'E-mail is requerido',
			v => /.+@.+/.test(v) || 'El email debe ser válido',
		], 
        numberRule: [
            v => !!v || 'campo requerido',
            v => v > 0  || 'El valor debe ser mayor a cero',
            v => v <= 100  || 'El valor debe ser menor a 100'
        ]
            
        }
    };

}
</script>
<style lang="scss" scoped>
    .formCliente{
        background: white;
        padding: 2%;
        //border-radius: 8px;
		//border: 1px solid;
    }
	.vue-form-wizard{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
    .vue-form-wizard .wizard-header{
        display: none;
    }
    .v-tabs-slider {
        background-color: red;
        height: 100%;
        width: 100%;
    }
</style>
