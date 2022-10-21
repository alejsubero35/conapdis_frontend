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
            color="#009db0" 
            shape="tab" 
            finish-button-text="Guardar" 
            back-button-text="Atras" 
            next-button-text="Siguiente">
                <tab-content title="Información Básica"  icon="mdi mdi-bank-check" :before-change="beforeTabSwitch">
                    <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
						<v-row>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Rif"
									placeholder="Rif"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.rif"
									v-mask="'N-#########-#'"
								></v-text-field>
							</v-col>
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
									v-mask="'#######################'"
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
									v-mask="'#######################'"
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
									v-mask="'#######################'"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Año"
									placeholder="Año"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.year"
								></v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Organismo Inscrito a:"
									placeholder="Organismo Inscrito a:"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.organismo"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Página Web"
									placeholder="Página Web"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.web"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
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
							<v-col cols="12" sm="6" md="4">
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
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Número Patronal  IVSS"
									placeholder="Número Patronal  IVSS"
									outlined
									dense
									:rules="rules"
									v-model="bussinesform.employer_number_ivss"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
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
							<v-col cols="12" sm="12" md="12">
							<v-textarea
								label="Objeto de la Empresa"
								placeholder="Objeto de la Empresa"
								outlined
								dense
								:rules="rules"
								v-model="bussinesform.location"
								rows="3"
							></v-textarea>
							</v-col>
						</v-row>
                	</v-form>
				</tab-content>
                <tab-content title="Direccion y Teléfonos"  icon="mdi mdi-cellphone-marker" :before-change="beforeTabSwitchTwo">
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
								<v-select
									:items="typerif"
									item-text="text"
									item-value="value"
									label="Sector"
									placeholder="Sector"
									v-model="bussinesform.owner_id"
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
							<v-col cols="12" sm="12" md="9">
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
								v-model="bussinesform.email_business"
							></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-select
									:items="tipodocumentos"
									item-text="text"
									item-value="value"
									label="Cargo"
									placeholder="Cargo"
									outlined
									dense
									v-model="bussinesform.type_identity_card"
									:rules="rules"
									required
								></v-select>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Teléfono"
									placeholder="###########"
									outlined
									dense
									v-model="bussinesform.phone2"
									v-mask="'###########'"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="3">
								<v-text-field
									label="Teléfono"
									placeholder="###########"
									outlined
									dense
									v-model="bussinesform.phone3"
									v-mask="'###########'"
								></v-text-field>
							</v-col>
						</v-row>
					</v-form>	
				</tab-content>
			<!-- 	<tab-content title="Accesibilidad en el entorno Físico" icon="mdi mdi-playlist-check" :before-change="beforeTabSwitchFour">
					<v-form class="formCliente" ref="validateStepFormFour"  lazy-validation >	
					    <v-row>
						<v-col cols="12" sm="12" md="12">
							<v-container>  
								<v-layout>    
									<v-row>   
										<v-col cols="12" sm="6" md="6">
											<v-switch
											label="Rampas"
											v-model="bussinesform.charger"
											color="success"
											:value="charger"  
											hide-details
											class="pl-3 pr-3"
											></v-switch>
											<v-switch
											label="Accesibilidad"
											v-model="bussinesform.cable_usb"
											color="success"
											:value="cable_usb"    
											hide-details
											class="pl-3 pr-3"
											></v-switch>
											<v-switch
											label="Acceso Directo"
											v-model="bussinesform.battery"
											color="success"
											:value="battery"    
											hide-details
											class="pl-3 pr-3"
											></v-switch>
											<v-switch
											label="Transporte Público"
											v-model="bussinesform.battery_cover"
											color="success"
											:value="color"
											hide-details
											class="pl-3 pr-3"
											></v-switch>
											<v-switch
											label="Transporte Empresa"
											v-model="bussinesform.printer_cap"
											color="success"
											:value="printer_cap"
											hide-details
											class="pl-3 pr-3"
											></v-switch>
											<v-switch
											label="Señalizaciones Luminosas"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Puestos de Estacionammiento"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Señalización"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Herramienta Tecnológica"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>

											</v-col>
											<v-col cols="12" sm="6" md="6">
											<v-switch
											label="Vialidad"
											v-model="bussinesform.simcard"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="simcard"
											></v-switch>
											<v-switch
											label="Baños Acondicionados para Discapacidad Motora"
											v-model="bussinesform.box"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="box"
											></v-switch>
											<v-switch
											label="Escaleras"
											v-model="bussinesform.thermal_roll"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="thermal_roll"
											></v-switch>
											<v-switch
											label="Pasamanos"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Pasillos"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Ascensores"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Puertas Adaptadas"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
											<v-switch
											label="Buena Iluminación"
											v-model="bussinesform.manual"
											color="success"
											hide-details
											class="pl-3 pr-3"
											:value="manual"
											></v-switch>
								
										</v-col>
									</v-row>
								</v-layout>
							</v-container>
						</v-col>
						</v-row>
					</v-form>	
				</tab-content> -->
            </form-wizard> 
            </div>
         
    
    <Notificacion :snackbar="snackbar" :textmsj="textmsj"/>
        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title>
                    Campos Incompletos
                </v-card-title>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                    Aceptar
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import bussinesModule from '@/store/modules/bussinesModule';
import { ValidationObserver } from 'vee-validate'


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
    bussinesform : any = {}
    loadingWizard = false
	typerif = [
        {value: '1', text: 'Consejo Comunal'},
        {value: '2', text: 'Gobierno'},
		{value: '3', text: 'Jurídico'},
		{value: '4', text: 'Personal'}
    ];
	tipodocumentos  = [
        {value: 'Nacimiento', text: 'Acta de Nacimiento'},
        {value: 'Extranjero', text: 'Cédula Extranjero'},
		{value: 'Residente',  text: 'Cédula Residente'},
		{value: 'Venezolano', text: 'Cédula Venezolano'},
		{value: 'Pasaporte',  text: 'Pasaporte'}
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
    sectiontitle = 'Registro de Empresa'
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
	$refs!: {
        validateStepForm: InstanceType<typeof ValidationObserver>;
        validateStepFormTwo: InstanceType<typeof ValidationObserver>;
		validateStepFormThree: InstanceType<typeof ValidationObserver>;
		validateStepFormFour: InstanceType<typeof ValidationObserver>;
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
    beforeTabSwitch(){
        const valid :any =  this.$refs.validateStepForm.validate();
		const newStr = this.FormRequest.rif.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
		this.FormRequest.rif = newStr.slice(1)
	
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

	onComplete() {

		const valid :any =  this.$refs.validateStepForm.validate();

        if (valid) {
            this.saveBussines();
        }else {
            this.dialog = true
        } 
		
    }
 	async saveBussines() {
        console.log(this.FormRequest)
 		this.overlay = true
    	const data = await bussinesModule.save(this.FormRequest)
		this.reset();
        this.textmsj = 'Empresa Registrada con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
		this.overlay = false 
    }; 
	async getStates(){
		const states : any = await bussinesModule.getStatesAll()
		this.arrayStates = states.data.data
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
            //this.$router.go(-1);
            this.snackbar = false
        },2000);
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
