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
            <tab-content title="Datos Fiscales"  icon="mdi mdi-bank-check" :before-change="beforeTabSwitch">
                <v-form class="formCliente" ref="validateStepForm"  lazy-validation >	
                <v-row>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-text-field
                        label="Código"
                        placeholder="Código"
                        outlined
                        dense
                        :rules="rules"
                        v-model="bussinesform.co_cliente"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-text-field
                        label="Rif"
                        placeholder="Rif"
                        outlined
                        dense
                        :rules="rules"
                        v-model="bussinesform.rif"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    >
                    <v-text-field
                        label="Nombre completo o Razón social"
                        placeholder="Nombre completo o Razón social"
                        outlined
                        dense
                        :rules="rules"
                        v-model="bussinesform.razon_social"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    >
                        <v-textarea
                        label="Dirección Fiscal"
                        placeholder="Dirección Fiscal"
                        outlined
                        dense
                        :rules="rules"
                        v-model="bussinesform.direccion_fiscal"
                        rows="3"
                    ></v-textarea>
                    </v-col>				
                    <v-col
                    cols="12"
                    sm="6"
                    md="6"
                    >
                    <v-textarea
                        label="Direccion Entrega"
                        placeholder="Direccion Entrega"
                        outlined
                        dense
                        :rules="rules"
                        v-model="bussinesform.direccion_entrega"
                        rows="3"
                    ></v-textarea>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-text-field
                        label="Teléfono"
                        placeholder="Teléfono"
                        outlined
                        dense
                        :rules="rules"
                        v-model="bussinesform.telefono"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-text-field
                        label="Email"
                        placeholder="Email"
                        outlined
                        dense
                        :rules="emailRules"
                        v-model="bussinesform.email"
                    ></v-text-field>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                        <v-select
                        :items="option"
                        item-text="text"
                        item-value="value"
                        label="Agente Retención"
                        placeholder="Agente Retención"
                        v-model="agente_retencion"
                        outlined
                        dense
                        :rules="rules"
                        required
                    
                    ></v-select>
                    </v-col>
                </v-row>
                    </v-form>
            </tab-content>
            <tab-content title="Otros Datos " icon="mdi mdi-badge-account-alert">
                <input type="hidden" v-model="bussinesform.id" value="0" >
                <v-row>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-select
                        :items="tipoclientes"
                        item-text="nombre"
                        item-value="id"
                        label="Tipo Cliente"
                        placeholder="Tipo Cliente"
                        v-model="bussinesform.id_tipo_cliente"
                        outlined
                        dense
                        :rules="rules"
                        required
                    ></v-select>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-select
                        :items="vendedor"
                        item-text="nombreCompleto"
                        item-value="id"
                        label="Vendedor"
                        placeholder="Vendedor"
                        v-model="bussinesform.id_vendedor"
                        outlined
                        dense
                        :rules="rules"
                        required
                    ></v-select>
                    </v-col>
                        <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-select
                        :items="condicionespago"
                        item-text="nombre"
                        item-value="id"
                        label="Condicion Pago"
                        placeholder="Condicion Pago"
                        v-model="bussinesform.id_condiciones_pagos"
                        outlined
                        dense
                        :rules="rules"
                        required
                    ></v-select>
                    </v-col>
                                <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        >
                        <v-select
                        :items="zonas"
                            item-text="nombre"
                            item-value="id"
                            label="Zona"
                            placeholder="Zona"
                            outlined
                            dense
                            :rules="rules"
                            v-model="bussinesform.id_zona"
                        ></v-select>
                        </v-col>
                </v-row>
                    <v-row>
                    <v-col
                    cols="12"
                    sm="6"
                    md="3"
                    >
                    <v-select
                        :items="segmentos"
                        item-text="nombre"
                        item-value="id"
                        label="Segmento"
                        placeholder="Segmento"
                        v-model="bussinesform.id_segmento"
                        outlined
                        dense
                        :rules="rules"
                        required
                    ></v-select>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        >
                        <v-select
                            :items="inactivo"
                            item-text="text"
                            item-value="value"
                            label="Estatus"
                            placeholder="Activo/Inactivo"
                            outlined
                            dense
                            :rules="rules"
                            
                            
                        ></v-select>
                    </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="3"
                        >
                        <v-text-field
                            label="Porcentaje Descuento"
                            placeholder="Porcentaje Descuento"
                            outlined
                            dense
                            v-model="bussinesform.porcentaje_desc_global"
                            type="number"
                            :rules="numberRule"
                        ></v-text-field>
                        </v-col>
                    </v-row>
            </tab-content>
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
import {serialize, deserialize } from 'jsonapi-fractal'

@Component({
  components: {

  }
})
export default class EditarCliente extends Vue {
	zonas?: any = [];
	tipoclientes?: any = [];
	vendedor?: any = [];
	segmentos?: any = [];
	condicionespago?: any = [];
	overlay = false;
	title : string = '';
	subtitle : string = ''
	validateStepForm : any = {inactivo: '1'};
    bussinesform : object = {
        country_id : 237
    }
    loadingWizard = false
	option = [
        {value: '0', text: 'No'},
        {value: '1', text: 'Si'}
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
	$refs!: {
        validateStepForm: InstanceType<typeof ValidationObserver>;
    };
	get FormRequest(): any {
        return serialize(this.bussinesform,'clientes',{});
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
        if (valid) {
           return true
        }else {
            return false
        }
    } 

	onComplete() {
		const valid :any =  this.$refs.validateStepForm.validate();

        if (valid) {
            this.saveCliente();
        }else {
            this.dialog = true
        } 
		
    }
 	async saveCliente() {
        console.log(this.FormRequest)
 		/* this.overlay = true
    	const data = await clientModule.saveClient(this.FormRequest)
		this.reset();
        this.textmsj = 'Cliente Creado con Éxito.'
        this.color = 'success'
        this.snackbar = true
        this.back();
		this.overlay = false  */
    }; 

/*     async comboboxAll(){
        const zona              = await  bussinesModule.getZonasAll();
        this.zonas = zona;
        const tipocliente       = await  bussinesModule.getTipoClienteAll();
        this.tipoclientes = tipocliente;
        const segmento          = await  bussinesModule.getSegmentosAll();
        this.segmentos = segmento;
        const vendedor          = await  bussinesModule.getVendedorAll();
        this.vendedor = vendedor;
        const condicionespago   = await  bussinesModule.getCondicionesPagoAll();
        this.condicionespago = condicionespago
    } */

	reset () {
        this.$refs.validateStepForm.reset()
    };
    back() {
        setTimeout(() => {
            this.$router.go(-1);
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
        this.bussinesform.country_id = 237

        //this.comboboxAll();       
       
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
