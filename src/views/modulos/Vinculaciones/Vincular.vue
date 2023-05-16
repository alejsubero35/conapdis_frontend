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
                <v-tab>DATOS DE PERSONA</v-tab>
                <v-tab>PERSONAS VINCULADAS</v-tab>
     
                <v-tab-item>
                    <v-container fluid>
                        <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
                            <input type="hidden" v-model="vincularform.id" value:any="0" >					
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="Cédula"
                                        placeholder="Cédula"
                                        dense
                                        :rules="rules"
                                        v-model="vincularform.identity_card_rl"
                                        v-mask="'###########'"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="Nombre y Apellido"
                                        placeholder="Nombre y Apellido"
                                        dense
                                        :rules="rules"
                                        v-model="vincularform.number"
                                    ></v-text-field>
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
                                            label="Fecha/Ingreso"
                                            append-icon="mdi-calendar"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            dense 
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
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                        :items="arrayPosition"
                                        item-text="name"
                                        item-value="id"
                                        label="Cargo"
                                        placeholder="Cargo"
                                        dense
                                        :rules="rules"
                                        required
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="Sueldo"
                                        placeholder="Sueldo"
                                        dense
                                        :rules="rules"
                                        v-model="vincularform.sueldo"
                                        type="number"
                                        value="0.00"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex justify-end">
                                <v-btn > <v-icon>mdi-content-save-outline</v-icon> Vincular</v-btn>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container fluid>
                        <v-form class="formCliente" ref="validateStepFormTwo"  lazy-validation >	
                            <input type="hidden" v-model="vincularform.id" value:any="0" >
                            <v-row>
                                <v-col  cols="12" sm="12" md="12">
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
                                        <template  v-slot:item.actions="{ item }">
                                            <div class="d-flex">
                                                <v-tooltip v-if="validateStatusProject !== '4'" top>
                                                    <template v-slot:activator="{on, attrs}">
                                                        <v-btn
                                                            color="success"
                                                            dark
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            @click="edit(item)"   
                                                        >
                                                            <v-icon>mdi-pencil-box-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Editar Tarea</span>
                                                </v-tooltip>
                                                <v-tooltip v-if="validateStatusProject !== '4'" top>
                                                    <template v-slot:activator="{on, attrs}">
                                                        <v-btn
                                                            color="error"
                                                            dark
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            @click="DeleteItem(item)"   
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
                    </v-container>
                </v-tab-item>
           </v-tabs>
         <!--    <form-wizard  
            class="test " 
            :start-index="tabIndex"
            :title="title" 
            :subtitle="subtitle" 
            @on-loading="setLoading"
            @on-validate="handleValidation"
            @on-complete="onComplete" 
            color="#3f51b5" 
            shape="tab" 
            finish-button-text="Guardar" 
            back-button-text="Atrás" 
            next-button-text="Siguiente"
			>
                <tab-content title="DATOS DE PERSONA"  icon="mdi mdi-card-account-details-outline" :before-change="beforeTabSwitch">
                    <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
						<input type="hidden" v-model="vincularform.id" value:any="0" >					
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Cédula"
									placeholder="Cédula"
									dense
									:rules="rules"
									v-model="vincularform.identity_card_rl"
									v-mask="'###########'"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Nombre y Apellido"
									placeholder="Nombre y Apellido"
									dense
									:rules="rules"
									v-model="vincularform.number"
								></v-text-field>
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
										label="Fecha/Ingreso"
										append-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
										dense 
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
						</v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-select
                                    :items="arrayPosition"
                                    item-text="name"
                                    item-value="id"
                                    label="Cargo"
                                    placeholder="Cargo"
                                    dense
                                    :rules="rules"
                                    required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
								<v-text-field
									label="Sueldo"
									placeholder="Sueldo"
									dense
									:rules="rules"
									v-model="vincularform.sueldo"
									type="number"
                                    value="0.00"
								></v-text-field>
							</v-col>
						</v-row>
                	</v-form>
				</tab-content>
				<tab-content title="PERSONAS VINCULADAS"  icon="mdi mdi-account" :before-change="beforeTabSwitchTwo">
                    <v-form class="formCliente" ref="validateStepFormTwo"  lazy-validation >	
						<input type="hidden" v-model="vincularform.id" value:any="0" >
                        <v-row>
                            <v-col  cols="12" sm="12" md="12">
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
                                    <template  v-slot:item.actions="{ item }">
                                        <div class="d-flex">
                                            <v-tooltip v-if="validateStatusProject !== '4'" top>
                                                <template v-slot:activator="{on, attrs}">
                                                    <v-btn
                                                        color="success"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        icon
                                                        @click="edit(item)"   
                                                    >
                                                        <v-icon>mdi-pencil-box-outline</v-icon>
                                                    </v-btn>
                                                </template>
                                                <span>Editar Tarea</span>
                                            </v-tooltip>
                                            <v-tooltip v-if="validateStatusProject !== '4'" top>
                                                <template v-slot:activator="{on, attrs}">
                                                    <v-btn
                                                        color="error"
                                                        dark
                                                        v-bind="attrs"
                                                        v-on="on"
                                                        icon
                                                        @click="DeleteItem(item)"   
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
				</tab-content>
            </form-wizard>  -->
        </div>
    	<Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color"/>
		<v-dialog
		v-model="dialog" max-width="400">
		<v-card>
		  <v-card-title class="text-h5">
			Empresa Registrada con Éxito
		  </v-card-title>
  
		  <v-card-text>
			Se le ha enviado un Email a su Correo Electrónico, por favor indique si desea cargar los documentos 
		  </v-card-text>
  
		  <v-card-actions>
			<v-spacer></v-spacer>
  
			<v-btn
			  color="danger"
			  text
			  @click="goHome()"
			>
			  No
			</v-btn>
  
			<v-btn
			  color="primary"
			  text
			  @click="goDocuments()"
			>
			  Si
			</v-btn>
		  </v-card-actions>
		</v-card>
	  </v-dialog>
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
	overlay = false;
	title : string = '';
	subtitle : string = ''
	validateStepForm : any = {inactivo: '1'};
    arrayPosition = []
    vincularform : any = { 
		code: 0, 
		message:'', 
	}
    loadingWizard = false

    agente_retencion = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'Vincular - Desvincular (PCD)'
    dialog = false
    tabIndex = 0
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
  
    headers = [
        {text: 'N° Orden', value: 'id'},
        {text: 'Cliente', value: 'customers.name_legal'},
        {text: 'Técnico', value: 'technicals.name'},
        {text: 'Fecha', value: 'start'},
        {text: 'Modo de Servicio', value: 'servicemodes.description'},
        {text: 'Estatus', value: 'serviceorderstatuses.description'},
        {text: 'Action', value: 'action'}
    ];
    desserts = []
	$refs!: {
        validateStepForm: InstanceType<typeof ValidationObserver>;
        validateStepFormTwo: InstanceType<typeof ValidationObserver>;			
	}
	get getBussines() {
        return bussinesModule.getBussines; 
    }
	get FormRequest(): any {
        return this.vincularform;
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
		this.vincularform.registration_date = this.date
	}
	validateRif(value){
		if(value.length == 12){
			alert('hacer peticion al api')
			console.log(value)

		}
	}
    async getPositionAll(){
		const position : any = await sessionModule.getPositionAll()
		this.arrayPosition = position.data.data
	}
    beforeTabSwitch(){
        const valid :any =  this.$refs.validateStepForm.validate();
			
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
	
	onComplete() {console.log(this.FormRequest)
		if (this.FormRequest.id > 0) {
			this.update();
		} else {
			this.save();
		}	
    }
 	async save() { 
		console.log(this.FormRequest)
/*  		this.overlay = true
    	const data = await bussinesModule.save(this.FormRequest)
		console.log(data)
		if(data.code == 201){
			this.textmsj = 'Empresa Creada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			await sessionModule.updateStatusBussines('registered')
			this.overlay = false 
			this.dialog = true
		} else {
			this.textmsj = 'Error al Registrar los datos de la Empresa.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		} */
    }; 
	async update(){
 		this.overlay = true
    	const data = await bussinesModule.update(this.FormRequest)
	
		if(data.code == 201){
			this.textmsj = 'Usuario Vinculado con Éxito.'
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
    mounted(){
        this.getPositionAll()
    }
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
