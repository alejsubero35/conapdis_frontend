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
            <input type="hidden" v-model="dataForm.status_postula_oferta">
            <v-row class="mt-5 p-3">
                <v-col cols="12" sm="12" md="12">
                    <v-text-field
                        label="Empresa"
                        placeholder="Empresa"
                        outlined
                        dense
                        :rules="rules"
                        v-model="empresaname"
                        readonly
                        class="ml-2"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-select
                        :items="arrayCharges"
                        item-text="desc_cargo_postula"
                        item-value="id_cargo_postula"
                        label="Cargo"
                        placeholder="Cargo"
                        outlined
                        dense
                        :rules="rules"
                        class="ml-4"
                        return-object
                        @change="getChargeObject($event)"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6"	md="6">
                    <v-select
                        :items="arrayProfession"
                        item-text="desc_profesion_postula"
                        item-value="id_profesion_postula"
                        label="Profesión"
                        placeholder="Profesión"
                        outlined
                        dense
                        :rules="rules"
                        required
                        class="mr-2"
                        return-object
                        @change="getProfesionObject($event)"
                    ></v-select>
                </v-col>
 
                <v-col cols="12" sm="12" md="12">
              
                    <!-- <ckeditor  :config="editorConfig" v-model="dataForm.descripcion_postula_oferta"></ckeditor> -->
                    <v-textarea
                    label="Descripción de la Oferta"
                    placeholder="Descripción de la Oferta"
                    dense
                    outlined
                    v-model="dataForm.descripcion_postula_oferta"
                    ></v-textarea>
                </v-col>	
                <v-col cols="12" sm="12" md="12">
                    <!-- <ckeditor  :config="editorConfig"  v-model="dataForm.requisitos_postula_oferta"></ckeditor> -->
                    <v-textarea
                    label="Requisitos"
                    placeholder="Requisitos"
                    dense
                    outlined
                    v-model="dataForm.requisitos_postula_oferta"
                    ></v-textarea>
                </v-col>			
                <v-col cols="12" sm="12" md="12">
                    <!-- <ckeditor  :config="editorConfig"  v-model="dataForm.beneficios_postula_oferta"></ckeditor> -->
                    <v-textarea
                    label="Beneficios"
                    placeholder="Beneficios"
                    dense
                    outlined
                    v-model="dataForm.beneficios_postula_oferta"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Vacantes"
                        placeholder="Vacantes"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.cantidad_postula_oferta"
                        type="number"
                        min="0"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6"	md="4">
                    <v-text-field
                        label="Experiencia"
                        placeholder="Experiencia"
                        outlined
                        dense
                        :rules="rules"
                        v-model="dataForm.experiencia_postula_oferta"
                        type="number"
                        min="0"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center"><h5>Discapacidades</h5></v-row>
            <v-row>
                <v-col v-for="(discapacidades,index) in arrayDiscapacidades" :key="index" cols="12" sm="4" md="4">
                    <v-checkbox
                    :label="discapacidades.nombre"
                    color="indigo"
                    :value="discapacidades.id"
                    hide-details
                    class="ml-5"
                    dense
                    @change="selectChk(discapacidades,index)"
                    ></v-checkbox>
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
import ofertModule from '@/store/modules/ofertModule';
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
        status_postula_oferta : 'ACTIVA',
        arraydisc : []
    };
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
    empresaname = ''
    arrayCharges = []
    arrayProfession = []
    arrayDiscapacidades = []
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
    arrayChk = []   
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm
    }

    getChargeObject(event){
        this.dataForm.id_cargo_postula_oferta = event.id_cargo_postula
        this.dataForm.descripcion_postula_oferta
    }
    getProfesionObject(event){
        this.dataForm.id_profesion_postula_oferta = event.id_profesion_postula
    }
    selectChk(disc,idx){
        let index  = this.arrayChk.findIndex(({ id })  => id == disc.id)
        console.log(index)
        if(index >= 0){
            this.arrayChk  = this.arrayChk.filter(val => val.id != disc.id)
        }else{
            this.arrayChk.push(disc)
        }
        this.dataForm.arraydisc = this.arrayChk
 
    }
	onSubmit() {

        const valid :any =  this.$refs.dataForm.validate();

        if (valid) {
            this.saveOfert();
        }else {
            this.dialog = true
        } 
		
    }
 	async saveOfert() { 
 		this.overlay = true
    	const data = await ofertModule.save(this.FormRequest)
        console.log(data)
		if(data.code == 200 || data.code == 201){
			this.textmsj = 'Oferta Creada con Éxito.'
			this.color = 'success'
			this.snackbar = true
			this.back();
			this.overlay = false 
		} else {
			this.textmsj = 'Error al Registrar los datos de la Oferta.'
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
        const charges : any = await  ofertModule.getCharges();
        this.arrayCharges = charges.data
        const profession : any = await ofertModule.getprofession();
        this.arrayProfession = profession.data
        const discapacidades : any = await ofertModule.getDiscapacidades();
        this.arrayDiscapacidades = discapacidades.data
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
    mounted(){console.log(storageData.get('_bussines'))
        this.comboboxAll(); 
        this.empresaname = storageData.get('_bussines').rif + '-' +storageData.get('_bussines').company_name  
        this.dataForm.id_postula_empresa = storageData.get('_bussines').id
        this.dataForm.fecha_postula_oferta = this.date
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
