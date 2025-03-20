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
  
            <h2>Desempeño del Facilitador</h2>
            <v-row class="mt-2 p-3">
                <v-col cols="12" sm="2" md="2" v-for="(question, index) in questions" :key="index">
                    <h5>{{ question.text }}</h5>
                    <v-radio-group  
                    :value="question.selectedValue" 
                    @change="updateSelectedValue($event, index, question.name)"
                    :rules="rules"
                    >
                    <v-radio
                        v-for="(radio, radioIndex) in question.options"
                        :key="radioIndex"
                        :label="radio.text"
                        :value="radio.value"
                    ></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <!-- :checked="(radio.value === question.selectedValue) ? true : false" -->
            <v-row class="d-flex justify-center p-5">
                <v-btn @click="onSubmit"  color="primary" small>{{ btName }}</v-btn>
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
    sectiontitle = 'EVALUAR FORMACIÓN'
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
    radioGroup = ''
    answers = {
      id : null,
      punctuality_and_attendance : null,
      presentation_objectives : null,
      precision_and_clarity : null,
      content_development : null,
      resource_utilization : null,
      precision_in_responses : null,
      group_motivation : null,
      uptime_intended : null,
      organization_activity : null,
      physical_environment : null,
      general_orientations : null,
      gform_training_request_id: null,

    }
    arrayCalification = [
        {value: '1', text: 'Deficiente'},
        {value: '2', text: 'Regular'},
        {value: '3', text: 'Bueno'},
        {value: '4', text: 'Muy Bueno'},
        {value: '5', text: 'Excelente'},
    ]
     questions : any = [
        {
          text: 'Puntualidad y asistencia',
          name:'punctuality_and_attendance',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'punctuality_and_attendance',
          selectedValue: ''
        },
        {
          text: 'Presentación de los Objetivos',
          name:'presentation_objectives',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'presentation_objectives',
          selectedValue: ''
        },
        {
          text: 'Precisión y Claridad en su instrucción',
          name:'precision_and_clarity',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'precision_and_clarity',
          selectedValue: ''
        },
        {
          text: 'Desarrollo del contenido',
          name:'content_development',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'content_development',
          selectedValue: ''
        },
        {
          text: 'Manejo y utilización de los recursos',
          name:'resource_utilization',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'resource_utilization',
          selectedValue: ''
        },
        {
          text: 'Precisión en las respuestas ',
          name:'precision_in_responses',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'precision_in_responses',
          selectedValue: ''
        },
        {
          text: 'Motivación a la participación activa del grupo',
          name:'group_motivation',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'group_motivation',
          selectedValue: ''
        },
        {
          text: 'Tiempo destinado para el desarrollo de la actividad',
          name:'uptime_intended',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'uptime_intended',
          selectedValue: ''
        },
        {
          text: 'Organización general de la actividad',
          name:'organization_activity',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'organization_activity',
          selectedValue: ''
        },
        {
          text: 'Ambiento físico',
          name:'physical_environment',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'physical_environment',
          selectedValue: ''
        },
        {
          text: 'Atención y Orientación generales',
          name:'general_orientations',
          options: [
            { text: 'Deficiente', value: 1 },
            { text: 'Regular', value: 2 },
            { text: 'Bueno', value: 3 },
            { text: 'Muy Bueno', value: 4 },
            { text: 'Excelente', value: 5 }
          ],
          model: 'general_orientations',
          selectedValue: ''
        },
        // Agrega las otras 8 preguntas aquí
      ]
       isFormValid = false
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm;
    }

    updateFecha(){
        this.dataForm.fecha_propuesta_formacion_solicitud = this.date
    }
    validateForm() {
      this.isFormValid = Object.values(this.answers).every(value => value !== null);
    }
    updateSelectedValue(value, index, name) {
      this.answers[name] = value;
      this.validateForm();
    }
	onSubmit() {
     
        this.answers.gform_training_request_id = this.$route.params.id
 

        const valid :any =  this.$refs.dataForm.validate();

        if (valid) {
            this.save(this.answers);
        }else {
            this.dialog = true
        } 
		
    }
 	async save(datarequest) {
 		this.overlay = true
    	const data = await formacionModule.saveTraining(datarequest)

        if(data.code == 200 || data.code == 201){
          this.textmsj = 'Evaluación de Formación Creada con Éxito.'
          this.color = 'success'
          this.snackbar = true
          this.back();
          this.overlay = false 
        } else {
            this.textmsj = 'Error al crear la Formación.'
            this.color = 'error'
            this.snackbar = true
            this.backError();
            this.overlay = false 
        }
	
    }; 

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
	async getEvaluationTrainig(id) {
		this.overlay = true;
		const data: any = await formacionModule.getEvaluationTrainig(id);

		if (data && !this.isObjectEmpty(data)) {

			this.questions[0].selectedValue  = data.punctuality_and_attendance;
			this.questions[1].selectedValue  = data.presentation_objectives;
			this.questions[2].selectedValue  = data.precision_and_clarity;
			this.questions[3].selectedValue  = data.content_development;
			this.questions[4].selectedValue  = data.resource_utilization;
			this.questions[5].selectedValue  = data.precision_in_responses;
			this.questions[6].selectedValue  = data.group_motivation;
			this.questions[7].selectedValue  = data.uptime_intended;
			this.questions[8].selectedValue  = data.organization_activity;
			this.questions[9].selectedValue  = data.physical_environment;
			this.questions[10].selectedValue = data.general_orientations;

			this.answers = data
			this.btName = 'Actualizar'
		}

		this.overlay = false;
	}

	isObjectEmpty(obj: any): boolean {
		return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
	}
    mounted(){

		this.getEvaluationTrainig(this.$route.params.id)       

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
