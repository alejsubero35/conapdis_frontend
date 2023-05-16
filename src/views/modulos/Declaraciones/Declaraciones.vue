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
            <v-tab>DATOS DE LA NUEVA DECLARACIÓN</v-tab>
            <v-tab>DECLARACIONES</v-tab>
     
           <v-tab-item>
             <v-container fluid>
                <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
                    <input type="hidden" v-model="vincularform.id" value:any="0" >	
                    <v-row>
                        <p class="anuncio">Usted esta a punto de declarar un semestre ante el Conapdis la cantidad de Personas 
                            con Discapacidad que trabajan en su empresa según lo dispone la ley.Si Usted no esta 
                            de acuerdo con la cantidad de trabajadores que esta declarando, por favor dirijase al 
                            menú "Vincular - Desvincular PCD" y realice la vinculación o desvinculación de Trabajadores 
                            con Discapacidad a su empresa.</p>
                    </v-row>				
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                label="Total Nómina de trabajadores sin discapacidad "
                                placeholder="Total Nómina de trabajadores sin discapacidad "
                                dense
                                :rules="rules"
                                v-model="vincularform.identity_card_rl"
                                type="number"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                label="Trabajadores con Discapacidad "
                                placeholder="Trabajadores con Discapacidad "
                                dense
                                :rules="rules"
                                v-model="vincularform.number"
                                type="number"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-select
                                :items="arrayPosition"
                                item-text="name"
                                item-value="id"
                                label="Seleccione el Periodo"
                                placeholder="Seleccione el Periodo"
                                dense
                                :rules="rules"
                                required
                            ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-text-field
                                label="Porcentaje de Trabajadores con Discapacidad"
                                placeholder="Porcentaje de Trabajadores con Discapacidad"
                                dense
                                :rules="rules"
                                v-model="vincularform.sueldo"
                                type="number"
                                value="0.00"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="d-flex justify-end">
                        <v-btn > <v-icon>mdi-content-save-outline</v-icon> Declarar</v-btn>
                    </v-row>
                </v-form>
             </v-container>
           </v-tab-item>
           <v-tab-item>
                <v-container fluid>
                    <v-form class="formCliente" ref="validateStepFormTwo"  lazy-validation >	
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
    sectiontitle = 'Declaración'
    dialog = false
    tabIndex = 0
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
  
    headers = [
        {text: 'Código', value: 'id'},
        {text: 'Fecha de Registro', value: 'customers.name_legal'},
        {text: 'Periodo', value: 'technicals.name'},
        {text: 'Cantidad Trabajadores', value: 'start'},
        {text: 'Personas con Discapacidad', value: 'servicemodes.description'},
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
    .anuncio{
        color:blue;
        font-size: 18px;
    }
    .v-tabs-slider {
        background-color: red;
        height: 100%;
        width: 100%;
    }
</style>
