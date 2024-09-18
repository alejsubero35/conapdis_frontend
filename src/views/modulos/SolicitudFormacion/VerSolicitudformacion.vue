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
                <v-col cols="12" sm="6"	md="3">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        v-model="empresaname"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="3">
                    <v-select
                        :items="workshops"
                        item-text="description"
                        item-value="id"
                        label="Taller"
                        placeholder="Taller"
                        outlined
                        dense
                        :rules="rules"
                        required
                        v-model="workshop_id"
                        readonly
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="4"	md="3">
                    <v-text-field
                        label="Responsable Solicitud"
                        placeholder="Responsable Solicitud"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.responsible"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-text-field
                        label="Teléfono Responsable Solicitud"
                        placeholder="Teléfono Responsable Solicitud"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.phone_number"
                        type="number"
                        min="0"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4"	md="3">
                    <v-text-field
                        label="Cantidad Participantes"
                        placeholder="Cantidad Participantes"
                        outlined
                        dense
                        :rules="rulesNum"
                        v-model="dataForm.number_of_participants"
                        type="number"
                        min="0"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="3">
                    <v-select
                        :items="invitedInstitutions"
                        item-text="text"
                        item-value="value"
                        label="Instituciones Invitadas"
                        placeholder="Instituciones Invitadas"
                        v-model="dataForm.invited_institutions"
                        outlined
                        dense
                        readonly
                    ></v-select>
                </v-col>
                <v-col v-show="cantInvited" cols="12" sm="4"	md="3">
                    <v-text-field
                        label="Cantidad Personas Invitadas"
                        placeholder="Cantidad Personas Invitadas"
                        outlined
                        dense
                        v-model="dataForm.invited_people_number"
                        type="number"
                        min="0"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
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
                        @change="getMunicipalityByState($event)"
                        readonly
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-select
                        :items="arrayMunicipality"
                        item-text="name"
                        item-value="id"
                        label="Municipio"
                        placeholder="Municipio"
                        v-model="dataForm.municipio_id"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="getParishesByMunicipality($event)"
                        readonly
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-select
                        :items="arrayParishes"
                        item-text="name"
                        item-value="id"
                        label="Parroquia"
                        placeholder="Parroquia"
                        v-model="dataForm.parroquia_id"
                        outlined
                        dense
                        :rules="rules"
                        required
                        readonly
                    ></v-select>
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
                            label="Fecha Prop. Formación"
                            append-icon="mdi-calendar"
                            disabled
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
                <v-col cols="12" sm="4" md="3">
                    <v-text-field
                        label="Hora Inicio"
                        placeholder="Hora Inicio"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.start_time"
                        type="time"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-text-field
                        label="Hora fin"
                        placeholder="Hora fin"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.end_time"
                        type="time"
                        readonly
                    ></v-text-field>
                </v-col>		
                 <v-col cols="12" sm="6"	md="3">
                    <v-text-field
                        label="Punto de Referencia"
                        placeholder="Punto de Referencia"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.benchmark"
                        readonly
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="3">
                    <v-select
                        :items="tipozona"
                        item-text="text"
                        item-value="value"
                        label="Tipo de Zona"
                        placeholder="Tipo de Zona"
                        v-model="dataForm.zona"
                        outlined
                        dense
                        :rules="rules"
                        required
                        @change="setItem()"
                        readonly
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="8" md="6">
                    <v-textarea
                        label="Dirección"
                        placeholder="Dirección"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.address"
                        rows="2"
                        readonly
                    ></v-textarea>
                </v-col>
            </v-row>
<!--             <v-row class="d-flex justify-center p-5">
                <v-btn @click="onSubmit"  color="primary" small>Guardar</v-btn>
            </v-row> -->
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
    invitedInstitutions = [
        {value: 1, text: 'Si'},
        {value: 0, text: 'No'},
    ]

    btName = 'Guardar'
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'VISUALIZAR SOLICITUD DE FORMACIÓN'
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
    workshop_id = ''
    cantInvited = false
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm;
    }

    updateFecha(){
        this.dataForm.fecha_propuesta_formacion_solicitud = this.date
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
		const municipality : any = await bussinesModule.getMunicipality(event.estado_id)
		this.arrayMunicipality = municipality.data.data
        this.dataForm.municipio_id = event.municipio_id
	}
	async getParishesByMunicipality(event){
		const parishes : any = await bussinesModule.getParishes(event.municipio_id)
		this.arrayParishes = parishes.data.data
        this.dataForm.parroquia_id = event.parroquia_id
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
    async getRequestTraining(id){
        this.overlay = true
        const data : any = await formacionModule.getRequestById(id)
        this.dataForm = data.data
        this.workshop_id = data.data.workshop.id
        if(data.data.invited_institutions == 1){
            this.cantInvited = true
        }else{
            this.cantInvited = false
        }
        await this.getMunicipalityByState(data.data)
        await this.getParishesByMunicipality(data.data)
    }
    mounted(){

        this.comboboxAll(); 
        this.getStates()
        this.getRequestTraining(this.$route.params.id)
        this.dataForm.id_postula_empresa = 3994  
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
