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
            <form-wizard  
            class="test " 
            :start-index="tabIndex"
            :title="title" 
            :subtitle="subtitle" 
            @on-loading="setLoading"
            @on-validate="handleValidation"
            @on-complete="onComplete" 
            color="#64A14D" 
            shape="tab" 
            finish-button-text="Guardar" 
            back-button-text="Atrás" 
            next-button-text="Siguiente">
                <tab-content title="Información Básica"  icon="mdi mdi-cube-send" :before-change="beforeTabSwitch">
                    <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
						<input type="hidden" v-model="bussinesform.id" value:any="0" >
						<v-row>
							<v-col cols="12" sm="6" md="3">
							<v-select
								:items="typerif"
								item-text="text"
								item-value="value"
								label="Tipo de Rif"
								placeholder="Tipo de Rif"
								v-model="bussinesform.type_rif"
								outlined
								dense
								:rules="rules"
								required
							></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Rif"
									placeholder="Rif"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.rif"
									v-mask="'############'"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="6">
								<v-text-field
									label="Razón social"
									placeholder="Razón social"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.company_name"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-switch
								label="¿Es una Sucursal?"
								v-model="sucursal"
								color="success"
								:value="is_sucursal"  
								hide-details
								@change="typeSucursal()"
								></v-switch>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									v-show="showSucursal"
									label="N° de Sucursal"
									placeholder="N° de Sucursal"
									outlined
									dense
									v-model="numero_sucursal"
									v-mask="'############'"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									v-show="showSucursal"
									label="Nombre Sucursal"
									placeholder="Nombre Sucursal"
									outlined
									dense
									v-model="nombre_sucursal"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col  cols="12" sm="12" md="12">
								<h5>Registro Mercantil</h5>
								<v-divider></v-divider>
							</v-col>
						</v-row>
						<v-row>	
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Tomo"
									placeholder="Tomo"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.tomo"
									 type="number"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Folio"
									placeholder="Folio"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.folio"
									 type="number"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Número"
									placeholder="Número"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.number"
									 type="number"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
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
										label="Año de constitución"
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
									@input="menu2 = false"
									@change="updateFecha()"
									></v-date-picker>
								</v-menu>
							</v-col>
				
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Duración en años"
									placeholder="Duración en años"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.duration"
									type="number"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Organismo Inscrito a:"
									placeholder="Organismo Inscrito a:"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.attached_body"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Página Web"
									placeholder="Página Web"
									outlined
									dense
									v-model="bussinesform.web"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
								label="Email Empresarial"
								placeholder="Email Empresarial"
								outlined
								dense
								:rules="emailRules"
								v-model="bussinesform.email"
							></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="arrayEconomicSector"
									item-text="name"
									item-value="id"
									label="Sector Económico"
									placeholder="Sector Económico"
									v-model="bussinesform.economic_sectors_id"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="arrayTypeCompany"
									item-text="name"
									item-value="id"
									label="Tipo de Empresa"
									placeholder="Tipo de Empresa"
									v-model="bussinesform.company_types_id"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Número Patronal  IVSS"
									placeholder="Número Patronal  IVSS"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.employer_number_ivss"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="arrayEconomicActivies"
									item-text="name"
									item-value="id"
									label="Actividad Económica"
									placeholder="Actividad Económica"
									v-model="bussinesform.economic_activity_id"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="arrayUserType"
									item-text="name"
									item-value="id"
									label="Tipo de Usuario"
									placeholder="Tipo de Usuario"
									v-model="bussinesform.user_type_id"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="12" md="9">
							<v-textarea
								label="Objeto de la Empresa"
								placeholder="Objeto de la Empresa"
								outlined
								dense
								:rules="rules"
								v-model="bussinesform.comercial_designation"
								rows="3"
							></v-textarea>
							</v-col>
						</v-row>
                	</v-form>
				</tab-content>
                <tab-content title="Direccion y Teléfonos"  icon="mdi mdi-cellphone-marker">
                    <v-form class="formCliente" ref="validateStepFormTwo"  lazy-validation >	
						<v-row>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="arrayStates"
									item-text="name"
									item-value="id"
									label="Estado"
									placeholder="Estado"
									v-model="bussinesform.state_id"
									outlined
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
									v-model="bussinesform.municipality_id"
									outlined
									dense
									:rules="rules"
									required
									@change="getParishesByMunicipality($event)"
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="arrayParishes"
									item-text="name"
									item-value="id"
									label="Parroquia"
									placeholder="Parroquia"
									v-model="bussinesform.parishe_id"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Teléfono"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.phone"
									
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="12" md="12">
								<v-textarea
									label="Dirección"
									placeholder="Dirección"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.location"
									rows="2"
								></v-textarea>
							</v-col>
						</v-row>
                    </v-form>
				</tab-content>
				<tab-content title="Representante Legal " icon="mdi mdi-account-box-outline" :before-change="beforeTabSwitchThree">
					<v-form class="formCliente" ref="validateStepFormThree"  lazy-validation >	
						<v-row>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="tipodocumentos"
									item-text="text"
									item-value="value"
									label="Tipo Documento"
									placeholder="Tipo Documento"
									v-model="bussinesform.type_identity_card"
									outlined
									dense
									:rules="rules"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Cédula / Pasaporte"
									placeholder="###########"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.identity_card_rl"
									v-mask="'###########'"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Nombres"
									placeholder="nombres"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.first_name_rl"
							
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Apellidos"
									placeholder="Apellidos"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.last_name_rl"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
								label="Email"
								placeholder="Email"
								outlined
								dense
								:rules="emailRules"
								v-model="bussinesform.email_rl"
							></v-text-field>
							</v-col>
						</v-row>
					</v-form>	
				</tab-content>
            </form-wizard> 
        </div>
    	<Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import bussinesModule from '@/store/modules/bussinesModule';
import sessionModule from '@/store/modules/sessionModule';
import { ValidationObserver } from 'vee-validate'
import storageData from '@/store/services/storageService'


@Component({
  components: {

  }
})
export default class Bussines extends Vue {
[x: string]: unknown;
	zonas?: any = [];
	tipoclientes?: any = [];
	vendedor?: any = [];
	segmentos?: any = [];
	condicionespago?: any = [];
	overlay = false;
	title : string = '';
	subtitle : string = ''
	validateStepForm : any = {inactivo: '1'};
    bussinesform : any = { code: 0, message:''}
    loadingWizard = false
	typerif = [
        {value: '1', text: 'V'},
        {value: '2', text: 'J'},
		{value: '3', text: 'G'},
		{value: '4', text: 'E'},
		{value: '5', text: 'P'}
    ];

	inactivo = [
        {value: '0', text: 'Inactivo'},
        {value: '1', text: 'Activo'}
    ];
    agente_retencion = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'Registrar Datos de Empresa'
    dialog = false
    tabIndex = 0
	charger        = false
    cable_usb      = false
    battery        = false
    battery_cover  = false
    printer_cap    = false
    simcard        = false
    box            = false
    thermal_roll   = false
    manual         = false
	arrayStates = []
	arrayMunicipality = []
	arrayParishes = []
	arrayEconomicSector = []
	arrayEconomicActivies = []
	arrayTypeCompany = []
	arrayUserType = []
	is_sucursal = false
	sucursal    = false
	tipodocumentos  = [
        {value: 'cedula', text: 'Cédula'},
        {value: 'pasaporte', text: 'Pasaporte'},
    ];
    tipoidentity  = [
        {value: 'v', text: 'Venezolano'},
        {value: 'e', text: 'Extrajero'},
    ];
	numero_sucursal = ''
	nombre_sucursal = ''
	showSucursal = false
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'

	$refs!: {
        validateStepForm: InstanceType<typeof ValidationObserver>;
        validateStepFormTwo: InstanceType<typeof ValidationObserver>;
		validateStepFormThree: InstanceType<typeof ValidationObserver>;
		validateStepFormFour: InstanceType<typeof ValidationObserver>;
	}
	get getBussines() {
        return bussinesModule.getBussines; 
    }
	get FormRequest(): any {
        return this.bussinesform;
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
		this.bussinesform.registration_date = this.date
	}
    beforeTabSwitch(){
        const valid :any =  this.$refs.validateStepForm.validate();
		if(this.nombre_sucursal != '' && this.numero_sucursal != '') {
			let code_office =  this.bussinesform.rif + '-' + this.nombre_sucursal.toUpperCase() + '-' + this.numero_sucursal
			this.bussinesform.code_branch_office = code_office
			Math.ceil(this.bussinesform.tomo)
			Math.ceil(this.bussinesform.folio)
			Math.ceil(this.bussinesform.number)
		}
	
        if (valid) {
           return true
        }else {
            return false
        }
    } 
    beforeTabSwitchTwo(){
        const valid :any =  this.$refs.validateStepFormTwo.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    } 
	beforeTabSwitchThree(){
        const valid :any =  this.$refs.validateStepFormThree.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    }
	beforeTabSwitchFour(){
        const valid :any =  this.$refs.validateStepFormFour.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    }
	async typeSucursal(){
		if (this.sucursal) {
			this.showSucursal = true
			this.bussinesform.is_major = 0
		} else {
			this.showSucursal = false
			this.bussinesform.is_major = 1
		}
	}
	onComplete() {
		if (this.FormRequest.id > 0) {
			this.updateBussines();
		} else {
			this.saveBussines();
		}	
    }
 	async saveBussines() {
 		this.overlay = true
    	const data = await bussinesModule.save(this.FormRequest)
		if(data.code == 201){
			this.textmsj = 'Empresa Creada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			this.overlay = false 
		} else {
			this.textmsj = 'Error al Registrar los datos de la Empresa.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		}
    }; 
	async updateBussines(){
 		this.overlay = true
    	const data = await bussinesModule.update(this.FormRequest)
		if(data.code == 202){
			this.textmsj = 'Empresa Actualizada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			this.overlay = false 
		} else {
			this.textmsj = 'Error al Actualizar los datos de la Empresa.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		}
		//this.reset();
       
	}
	async getStates(){
		const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data
	}
	async getUserType(){
		const typeuser : any = await bussinesModule.getUserTypeAll()
		this.arrayUserType = typeuser.data.data
	}
	async getEconomicSector(){
		const economicsector : any = await bussinesModule.getEconomicSectorAll()
		this.arrayEconomicSector = economicsector.data.data
	}
	async getEconomicActivies(){
		const economicactivies : any = await bussinesModule.getEconomicActiviesAll()
		this.arrayEconomicActivies = economicactivies.data.data
	}
	async getTypeCompany(){
		const typecompany : any = await bussinesModule.getTypeCompanyAll()
		this.arrayTypeCompany = typecompany.data.data
	}
	async getMunicipalityByState(event){
		const municipality : any = await bussinesModule.getMunicipality(event)
		this.arrayMunicipality = municipality.data.data
	}
	async getParishesByMunicipality(event){
		const parishes : any = await bussinesModule.getParishes(event)
		this.arrayParishes = parishes.data.data
	}
	
	reset () {
        this.$refs.validateStepForm.reset()
    };
    back() {
        setTimeout(() => {
            this.$router.push({ name: 'Dashboard' });
            this.snackbar = false
        },2000);
    }
	backError(){
		setTimeout(() => {
            this.snackbar = false
        },3500);
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
            v => !!v || 'campo requerido',
            v => v > 0  || 'El valor debe ser mayor a cero',
            v => v <= 100  || 'El valor debe ser menor a 100'
        ]
            
        }
    };
    mounted(){
		this.getStates()
		this.getEconomicSector()
		this.getEconomicActivies()
		this.getTypeCompany()
		this.getUserType()

		if (storageData.get('_bussines')) {
			this.bussinesform = storageData.get('_bussines')
			if(storageData.get('_bussines').hasOwnProperty('is_major')){
				this.sucursal = (this.getBussines.is_major == false) ? true : false
				this.showSucursal = true
				let cadena = this.getBussines.code_branch_office;
				var result = cadena.split('-')[1];
				var result2 = cadena.split('-')[2];
				this. sectiontitle = 'Actualizar Datos de Empresa'
				this.numero_sucursal = result2
				this.nombre_sucursal = result
			}
			
			this.getMunicipalityByState(this.bussinesform.state_id)
			this.getParishesByMunicipality(this.bussinesform.municipality_id)
			
		}
    }
}
</script>
<style lang="scss" scoped>
    .formCliente{
        background: white;
        padding: 3%;
        border-radius: 8px;
    }
    .vue-form-wizard .wizard-header{
        display: none;
    }
</style>
