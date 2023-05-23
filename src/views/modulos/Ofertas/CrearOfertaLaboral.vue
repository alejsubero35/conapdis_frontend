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
                <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="textRules"
                        v-model="dataForm.empresa"
                        readonly
                        class="ml-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-select
                        :items="agent"
                        item-text="text"
                        item-value="value"
                        label="Cargo"
                        placeholder="Cargo"
                        v-model="dataForm.taller"
                        outlined
                        dense
                        :rules="rulesNum"
                        required
                        class="ml-4"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-select
                        :items="agent"
                        item-text="text"
                        item-value="value"
                        label="Profesión"
                        placeholder="Profesión"
                        v-model="dataForm.taller"
                        outlined
                        dense
                        :rules="rulesNum"
                        required
                        class="mr-2"
                    ></v-select>
                </v-col>
 
                <v-col cols="12" sm="12" md="12">
                    <label for="" style="text-align:center">Descripción de la Oferta</label>
                    <ckeditor  :config="editorConfig"></ckeditor>
                </v-col>	
                <v-col cols="12" sm="12" md="12">
                    <label for="" style="text-align:center">Requisitos</label>
                    <ckeditor  :config="editorConfig"></ckeditor>
                </v-col>			
 
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Vacantes"
                        placeholder="Vacantes"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.vacantes"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Experiencia"
                        placeholder="Experiencia"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.experiencia"
                        type="number"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center"><h5>Discapacidades</h5></v-row>
            <v-row>
                <v-col cols="12" sm="4" md="4">
                    <v-checkbox
                    label="Mental-Intelectual"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="auditiva"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Cardiovascular"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Respiratoria"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Renal y Urinaria"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Disfunción de la Piel"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Nefrológicas"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-checkbox
                    label="Mental-Psicosocial"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Sordoceguera"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Hematológica"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Sistema Digestivo"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Genitales y de la Reproducción"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Displacia Ectodérmica"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-checkbox
                    label="Visual"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Voz y habla"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Inmunológica"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Metabólico/Endocrino"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Neuromusculo-esqueletica"
                    color="indigo"
                    value="indigo"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                    <v-checkbox
                    label="Acondroplasia"
                    color="indigo darken-3"
                    value="indigo darken-3"
                    hide-details
                    class="ml-5"
                    dense
                    ></v-checkbox>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center p-5">
                <v-btn  color="primary" small>Guardar</v-btn>
            </v-row>
        </v-form>
    <Notificacion :snackbar="snackbar" :textmsj="textmsj" :color="color" />
    <!-- <ModalApproved @confirm="confirm" :titleModalDelete="titleModalDelete" :textbody="textbody" :dialogDelete="openDialog" @cerrarModal="cerrarModal"/> -->
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
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
        inactive:1,
        estatus:1,
        allow_no_hours:0,
        allow_with_debt:0

    };
    companyForm : any = {
        name_legal:'',
        rif:'',
        telephone:'',
        email:'',
        agent_retention:'',
        address_fiscal:'',
        inactive:1,
        customers:{
            id:''
        }
    };
	option = [
        {value: 0, text: 'No'},
        {value: 1, text: 'Si'}
    ];
    agent = [
        {value: 0, text: 'No'},
        {value: 1, text: 'Si'}
    ];
	inactivo = [
        {value: 0, text: 'Inactivo'},
        {value: 1, text: 'Activo'}
    ];
    btName = 'Guardar'
    snackbar = false
    textmsj = ''
    color = ''
    timeout = 2000
    sectiontitle = 'AÑADIR OFERTA'
    dialog = false
    openDialog = false
    textbody = ''
    titleModalDelete = ''
    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
    editorConfig = {
        toolbar : [
	{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source', '-', '-' ] },
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ], items: [ '-', '-', 'Scayt' ] },
	{ name: 'forms', groups: [ 'forms' ], items: [ '' ] },
	{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ], items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Language' ] },

	{ name: 'styles', groups: [ 'styles' ], items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
	{ name: 'colors', groups: [ 'colors' ], items: [ 'TextColor', 'BGColor' ] },
	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-' ] },
	{ name: 'tools', groups: [ 'tools' ], items: [ 'Maximize' ] },
	{ name: 'others', groups: [ 'others' ], items: [ '-' ] },
	{ name: 'about', groups: [ 'about' ], items: [ 'About' ] }
]

    }
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return serialize(this.dataForm,'customers',{ relationships: ['pricelists']});
    }
	get FormRequestCompany(): any {
        return serialize(this.companyForm,'companies',{relationships: ['customers']});
    }

    handleValidation(isValid, tabIndex){
        console.log('Tab: '+tabIndex+ ' valid: '+isValid)
    }
     beforeTabSwitch(){
   
        const valid :any =  this.$refs.dataForm.validate();
        if (valid) {
           return true
        }else {
            return false
        }
    } 

	onSubmit() {
            this.companyForm.name_legal = this.dataForm.name_legal
            this.companyForm.rif = this.dataForm.rif
            this.companyForm.telephone = this.dataForm.phone
            this.companyForm.email = this.dataForm.email
            this.companyForm.agent_retention = this.dataForm.agent_retention
            this.companyForm.address_fiscal = this.dataForm.address_fiscal
            const valid :any =  this.$refs.dataForm.validate();

        if (valid) {
            this.saveCustomers();
        }else {
            this.dialog = true
        } 
		
    }
 	async saveCustomers() {
 		this.overlay = true
    	//const data = await formacionModule.saveCustomers(this.FormRequest)
       
/*         if(data.code == 200 || data.code == 201){
            this.companyForm.customers.id = data.id.toString()
            this.openDialog = true
            this.titleModalDelete = 'Crear Empresa'
            this.textbody = 'Desea Crear una Empresa para este Cliente?'
            this.overlay = false 
        } else {
            this.textmsj = 'Error al crear el Cliente.'
            this.color = 'error'
            this.snackbar = true
            this.backError();
            this.overlay = false 
        } */
	
    }; 
    async confirm(){
        this.openDialog = false
        this.overlay = true
        //const data = await companiesModule.saveCompany(this.FormRequestCompany)
  /*       if(data.code == 200 || data.code == 201){
            this.reset();
            this.textmsj = 'Cliente y Empresa Creados con Éxito.'
            this.color = 'success'
            this.snackbar = true
            this.back();
            storageData.remove('formCustomers')
            storageData.remove('pricelist_id')
            this.overlay = false 
        } else {
            this.textmsj = 'Error al crear la Empresa.'
            this.color = 'error'
            this.snackbar = true
            this.backError();
            this.overlay = false 
        } */
    }
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
       // const pricelist = await  formacionModule.getPriceListAll();
 

    }
    newForm(){
        this.$refs.dataForm.reset()
        setTimeout(() => {
            this.dataForm.inactive = 1,
            this.dataForm.estatus = 1,
            this.dataForm.allow_no_hours = 0,
            this.dataForm.allow_with_debt = 0,
            this.dataForm.porcent_desc_global = '0'
        },500);
    }

	reset () {
        this.$refs.dataForm.reset()

        setTimeout(() => {
            this.dataForm.inactive = 1,
            this.dataForm.estatus = 1,
            this.dataForm.allow_no_hours = 0,
            this.dataForm.allow_with_debt = 0,
            this.dataForm.porcent_desc_global = '0'
        },500);
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
    mounted(){
        this.comboboxAll();   
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
