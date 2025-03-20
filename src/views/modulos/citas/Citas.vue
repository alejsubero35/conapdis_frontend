<template>
    <div class="content-section">
	    <v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-form class="form_data_section"  lazy-validation >	
            <TitleSection :sectiontitle="sectiontitle"/>	
            <input type="hidden" v-model="dataForm.id">
            <v-row>
                <v-col cols="12">
                    <template>
                          <v-data-table
                              :headers="headers"
                              :items="desserts" 
                              :footer-props="{
                                  'items-per-page-text':'Filtro por Página'       
                              }"                     
                          >
                          <template v-slot:item.actions="{ item }">
                            <div class="d-flex">
                                <v-tooltip top>
                                    <template v-slot:activator="{on, attrs}">
                                        <v-btn
                                            color="error"
                                            dark
                                            @click="deleteAttendance(item)"   
                                            icon
                                            v-bind="attrs"
                                            v-on="on"
                                        >
                                            <v-icon>mdi-delete-circle-outline</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Eliminar Asistencia</span>
                                </v-tooltip>
                            </div>
                        </template>
                          </v-data-table>
                      </template>
                  </v-col>
            </v-row>
        </v-form>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ofertModule from '@/store/modules/ofertModule';
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
  
    };
    sectiontitle = 'LISTAR CITAS'
    empresaname = ''
    arrayDiscapacidades = []
    arrayChk = []   
    cargo_id = ''
    profesion_id = ''
    headers = [
        
 
        {text: 'Fecha ', value: 'fecha_cita'},
        {text: 'Cargo ', value: 'cargo'},
        {text: 'Profesión', value: 'profesion'},
        {text: 'PCD', value: 'fullname'},
        {text: 'Status.', value: 'status'},
    
    ];
    date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
    menu2 : boolean = false
    max25chars = v => v.length <= 25 || 'Input too long!'
    desserts = []
    arraySexo = []
    tallername = ''
	$refs!: {
        dataForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return this.dataForm
    }

    async getCitas(id){
        const data : any = await formacionModule.getCitasByBussinesId(id)
        this.desserts = data.data
    }
	reset () {
        this.$refs.dataForm.reset()
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
    mounted(){
        this.getCitas(storageData.get('_bussines').id)
  
        this.empresaname = storageData.get('_bussines').rif + '-' +storageData.get('_bussines').company_name  
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
