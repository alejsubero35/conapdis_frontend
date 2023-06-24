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
                <v-tab @click="getPersonLinked()">PERSONAS VINCULADAS</v-tab>
     
                <v-tab-item>
                    <v-container fluid>
                        <v-form class="formCliente" ref="vincularform"  lazy-validation >	
                            <input type="hidden" v-model="vincularform.id" value:any="0" >					
                            <v-row>
                                
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                    :items="arrayCustomers"
                                    item-text="cedula"
                                    item-value="id"
                                    label="Cédula"
                                    placeholder="Cédula"
                                    dense
                                    :rules="rules"
                                    required
                                    @change="getPersonCertificate($event)"
                                    return-object
                                   
                                    >        
                                    <template v-slot:prepend-item>
                                    <v-overlay :value="isLoading">
                                        <v-progress-circular
                                            indeterminate
                                            size="24"
                                            color="#ff7005"
                                        ></v-progress-circular>
                                    </v-overlay>
                                    <v-list-item>
                                        <v-list-item-content>
                                            <v-text-field type="number" min="1" v-model="searchTerm" placeholder="Buscar Persona Certificada"   @keyup.enter="searchCertificatePerson" autofocus ></v-text-field>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-divider ></v-divider>
                                    </template>
                                    </v-select>
                                    <!--  <span v-if="tieneCertificado" class="d-flex justify-end" style="margin-top:-12px;color: red">No Posee Certificado</span>
                                     <span v-if="personaExiste" class="d-flex justify-end" style="margin-top:-12px;color: red">Persona no encontrada</span>
                                     <span v-if="trabajaActualmente" class="d-flex justify-end" style="margin-top:-12px;color: red">La persona tiene registro activo con otra empresa</span>
                                     <span v-if="trabajaActualmenteEnsuEmpresa" class="d-flex justify-end" style="margin-top:-12px;color: red">La persona tiene registro activo con su empresa</span>
                                     <span v-if="vencido" class="d-flex justify-end" style="margin-top:-12px;color: red">La persona tiene el certificado Vencido</span> -->
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        label="Nombre y Apellido"
                                        placeholder="Nombre y Apellido"
                                        dense
                                        :rules="rules"
                                        v-model="fullname"
                                        readonly
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
                                        item-text="nombre"
                                        item-value="id"
                                        label="Cargo"
                                        placeholder="Cargo"
                                        dense
                                        :rules="rules"
                                        v-model="vincularform.cargo_personadiscapacidad"
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
                                        min="0"
                                        value="0.00"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4" style="margin-top:-36px">
                                    <label>Situación Laboral</label>
                                    <v-radio-group v-model="vincularform.trabaja_actualmente" row>
                                    <v-radio
                                      label="Fijo"
                                      value="Si"
                                    ></v-radio>
                                    <v-radio
                                      label="Contratado"
                                      value="No"
                                    ></v-radio>
                                  </v-radio-group>
                                </v-col>
                            </v-row>
                            <v-row class="d-flex justify-end">
                                <v-btn @click="onSubmit" > <v-icon>mdi-content-save-outline</v-icon> Vincular</v-btn>
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
                                            class="elevation-1 table-one"
                                            no-data-text="No hay datos disponibles"  
                                            :footer-props="{
                                                'items-per-page-options': [5, 10 -1],
                                                'items-per-page-text':'Filtro por Página'
                                                
                                            }"           
                                        >
                                        <template  v-slot:item.actions="{ item }">
                                            <div class="d-flex">
                                                <v-tooltip v-if="item.trabajo_hasta == null" top>
                                                    <template v-slot:activator="{on, attrs}">
                                                        <v-btn
                                                            color="error"
                                                            dark
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                            @click="openDialog(item)"   
                                                        >
                                                            <v-icon>mdi-account-multiple-minus-outline</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Desvincular</span>
                                                </v-tooltip>
                                                <v-tooltip v-else top>
                                                    <template v-slot:activator="{on, attrs}">
                                                        <v-btn
                                                            color="success"
                                                            dark
                                                            v-bind="attrs"
                                                            v-on="on"
                                                            icon
                                                        >
                                                            <v-icon>mdi-account-network-off</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Persona Desvinculada</span>
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
            <v-overlay :value="overlayDialog">
                <v-progress-circular
                    indeterminate
                    size="44"
                    class="laoding"
                ></v-progress-circular>
            </v-overlay>
		  <v-card-title class="text-h5">
			Desvincular Persona 
		  </v-card-title>
    
            <v-col cols="12" sm="12" md="12">
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
                        v-model="dategreso"
                        label="Fecha/Ingreso"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        dense 
                    ></v-text-field>
                    </template>
                    <v-date-picker
                    v-model="dategreso"
                    no-title
                    locale="es"
                    @input="menu = false"
                    @change="updateFechaEgreso()"
                    ></v-date-picker>
                </v-menu>
            </v-col>
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
      <v-dialog v-model="dialogOpen" max-width="350">
        <v-card>
            <v-card-title class="text-h5">
                Notificación
            </v-card-title>
            <v-card-text>
                {{ contentModal }} 
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="dialogOpen = false"
                >
                    Aceptar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import linkedModule from '@/store/modules/linkedModule';
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
    overlayDialog = false
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
    clear = true
    tieneCertificado = false
    trabajaActualmente = false
    personaExiste = false
    trabajaActualmenteEnsuEmpresa = false
    vencido = false
    NoIngFechaEgreso = false
    tabSelectedIndex = 0

    agente_retencion = ''
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'Vincular - Desvincular (PCD)'
    dialog = false
    dialogOpen = false
    tabIndex = 0
	date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    dategreso = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    menu : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
  
    headers = [
        {text: 'Id', value: 'id'},
        {text: 'Cédula', value: 'cedula'},
        {text: 'Nombres', value: 'nombres'},
        {text: 'Apellidos', value: 'apellidos'},
        {text: 'Trabaja Actualmente', value: 'trabaja_actualmente'},
        {text: 'Ingreso', value: 'trabaja_desde'},
        {text: 'Egreso', value: 'trabajo_hasta'},
        {text: 'Action', value: 'actions'}
    ];
    desserts        = []
    searchTerm      = ""
    isLoading       = false;
    arrayCustomers  = []
    fullname        = ''
    contentModal    = ''
	$refs!: {
        vincularform: InstanceType<typeof ValidationObserver>;
        desvincularform: InstanceType<typeof ValidationObserver>;			
	}

	get FormRequest(): any {
        return this.vincularform;
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
        
    }
	async updateFecha(){
		this.vincularform.trabaja_desde = this.date
	}
    async updateFechaEgreso(){
        this.desvincularform.trabajo_hasta = this.dategreso
    }

    async searchCertificatePerson(val) {
		this.isLoading = true
		const data : any = await linkedModule.searchCertificatePerson(this.searchTerm);

        if(data.data.length > 0){                            
            if(data.data[0].certificado == ''){
                this.tieneCertificado=true;
                this.dialogOpen = true
                this.contentModal = 'No posee Certificado'
                this.searchTerm = ''
                this.isLoading = false          
            }else if(data.data[0].trabajaactualmente == "Si"){
                this.trabajaActualmente=true; 
                this.dialogOpen = true
                this.contentModal = 'La persona tiene un registro activo con otra empresa'
                this.searchTerm = '' 
                this.isLoading = false   
            }else if(data.data[0].trabajaactualmenteenlaempresa == "Si"){
                this.trabajaActualmenteEnsuEmpresa=true; 
                this.dialogOpen = true
                this.contentModal = 'La persona tiene un registro activo con su empresa'
                this.searchTerm = '' 
                this.isLoading = false  
            }else if(data.data[0].vencido == "Si"){
                this.vencido=true; 
                this.dialogOpen = true
                this.contentModal = 'La persona tiene el certificado vencido'
                this.searchTerm = '' 
                this.isLoading = false  
            }else{
                this.arrayCustomers = data.data
                this.isLoading = false                   
            }
        }else{
            this.searchTerm = '' 
            this.isLoading = false 
            this.dialogOpen = true
            this.contentModal = 'Esta Cédula NO se encuentra registrada.' 
        }

	}
    getPersonCertificate(event){
        this.fullname = event.nombres+' '+event.apellidos
        this.vincularform.personas_discapacidad_id = event.id
        this.vincularform.empresa_id = storageData.get('_bussines_id')     
    }
    async getPositionAll(){
		const position : any = await linkedModule.getPositionAll()
		this.arrayPosition = position.data
	}	
	onSubmit() {
        const valid :any =  this.$refs.vincularform.validate();
        if(valid)  this.save()
  
    }
 	async save() { 
 		this.overlay = true
    	const data = await linkedModule.save(this.FormRequest)
	
		if(data.code == 200 || data.code == 201){
			this.textmsj = 'Persona Vinculada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
            this.reset(); 
            this.arrayCustomers = []
			this.overlay = false 
		} else {
			this.textmsj = 'Error al Registrar los datos de la Empresa.'
			this.color = 'error'
			this.snackbar = true
			this.backError();
			this.overlay = false 
		}
    }; 
    async getPersonLinked(){
        const linketAll : any = await  linkedModule.getPersonLinkedByBussine(storageData.get('_bussines_id'))
        this.desserts = linketAll.data
     
    }
    openDialog(item){
        this.dialog     = true
        this.desvincularform.id = item.id
        this.desvincularform.trabajo_hasta = this.dategreso
    }
    desvincular(){
        this.update()
    }
	async update(){
 		this.overlayDialog = true
    	const data = await linkedModule.update(this.FormRequestDesvincular)
	
		if(data.code == 200){
			this.textmsj    = 'Persona Desvinculada con Éxito.'
			this.color      = 'success'
			this.snackbar   = true
            this.dialog     = false
            this.getPersonLinked()
			this.back();
            this.desvincularform.motivo = ''
			this.overlayDialog    = false 		
		} else {
			this.textmsj    = 'Error al Actualizar los datos de la Empresa.'
			this.color      = 'error'
			this.snackbar   = true
			this.backError();
			this.overlayDialog    = false 
		}       
	}

	reset() {
        this.$refs.vincularform.reset()
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
    mounted(){
        this.getPositionAll()
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
