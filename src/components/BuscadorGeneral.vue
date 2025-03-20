<template>
    <div>
       	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-card-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
                <v-col class="mt-8" cols="12" sm="9" md="3">
                    <v-select
                        :items="newHeaders"
                        item-text="text"
                        item-value="value"
                        label="Seleccione Filtro"
                        placeholder="Seleccione Filtro"
                        outlined
                        dense
                        @change="filterSearch($event)"
                    ></v-select>
                </v-col>
                <v-col class="mt-5" v-if="data.filter == 'plans.name' || data.filter == 'errors.name'" cols="12" sm="9" md="4">
                    <v-select
                    :items="arrayGlobal"
                    item-text="name"
                    item-value="id"
                    :label="labelnew"
                    :placeholder="placeholder"
                    v-model="model"
                    @change="getValuefilter($event)"
                    >        
                    <template v-slot:prepend-item>
                    <v-list-item>
                        <v-list-item-content>
                        <v-text-field v-model="searhquery"  :placeholder="placeholder"  @input="searchGlobal"  ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                    </template>
                    </v-select>
                </v-col>
                <v-col class="mt-5" v-else-if="data.filter == 'serials.serial'" cols="12" sm="9" md="4">
                    <v-select
                    :items="arrayGlobal"
                    item-text="serial"
                    item-value="id"
                    :label="labelnew"
                    :placeholder="placeholder"
                    v-model="model"
                    @change="getValuefilter($event)"
                    >        
                    <template v-slot:prepend-item>
                    <v-list-item>
                        <v-list-item-content>
                        <v-text-field v-model="searhquery"  :placeholder="placeholder"  @input="searchGlobal"  ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                    </template>
                    </v-select>
                </v-col>
                <v-col class="mt-5" v-else-if="data.filter == 'customers.name_legal'" cols="12" sm="9" md="4">
                    <v-select
                    :items="arrayGlobal"
                    item-text="nameLegal"
                    item-value="id"
                    :label="labelnew"
                    :placeholder="placeholder"
                    v-model="model"
                    @change="getValuefilter($event)"
                    >        
                    <template v-slot:prepend-item>
                    <v-list-item>
                        <v-list-item-content>
                        <v-text-field v-model="searhquery"  :placeholder="placeholder"  @input="searchGlobal"  ></v-text-field>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider>
                    </template>
                    </v-select>
                </v-col>
                <v-text-field
                v-else
                @keyup.enter="searchData()"
                v-model="query"
                :label="label"
                single-line
                hide-details
            ></v-text-field>
            <v-btn
            small
            rounded
            color="success"
            dark
            @click="searchData()"
            >
            Buscar
            </v-btn>
        </v-card-title>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import globalModule from '@/store/modules/globalModule';
import invoiceModule from '@/store/modules/invoiceModule';
import { deserialize } from 'jsonapi-fractal'

@Component
export default class FiltroGeneral extends Vue {
    @Prop() readonly label!: string
    @Prop() readonly headers!: any
    @Prop() readonly endpoint!: string
 
    overlay : boolean = false
    newHeaders : any = []
    query = ''
    data : any = {
        query:null,
        filter:null,
        endpoint:this.endpoint,
        filterBy: '',
        id:''
    }
    arrayGlobal = []
    model       = ''
    showsearch  = false  
    placeholder = 'Buscar'
    labelnew    = 'Buscar'
    searhquery  = ''
    filterSearch(event){
        this.data.filter = event
        this.arrayGlobal = []  
    }
    async searchGlobal() {
        if(this.data.filter == 'plans.name'){
            const data : any = await globalModule.searchPlan(this.searhquery);
            this.arrayGlobal = data
        } else if(this.data.filter == 'errors.name') {
            const data : any = await globalModule.searchErrors(this.searhquery);
            this.arrayGlobal = data
        } else if(this.data.filter == 'customers.name_legal') {
            const data : any = await invoiceModule.getFiltersCustomers(this.searhquery);
            this.arrayGlobal = data
        } else {
            const data : any = await globalModule.searchSerials(this.searhquery);
            this.arrayGlobal = data
        }
	}
    async getValuefilter(event){
        this.searhquery = ''
        let data : any = [];
        this.data.id = event
        if(this.data.filter == 'plans.name'){
            this.data.filterBy = 'plan_id'
        } else if(this.data.filter == 'errors.name') {
            this.data.filterBy = 'error_id'
        } else if(this.data.filter == 'customers.name_legal') {
            this.data.filterBy = 'customer_id'
        } else {
            this.data.filterBy = 'serial_id'
        }
        const res : any = await globalModule.searchByRelation(this.data);
        data = deserialize(res.data)
        this.$emit('updateData', data);
    }
    
 	async searchData() {
	 	this.overlay = true
         if(this.data.filter == 'ticket_date' || this.data.filter == 'invoice_date' || this.data.filter == 'selldate' || this.data.filter == 'note_date'){
           this.data.query =  this.revertFormatDate(this.query)
            const data = await globalModule.getFilterSearch(this.data);
            this.$emit('updateData', data);
         } else {
            this.data.query = this.query
            const data = await globalModule.getFilterSearch(this.data);
            this.$emit('updateData', data);
   
         }
		
      
		this.overlay = false 
	} 
    eliminarCampoAction(array,elem) {
        return this.headers.filter(e=> e.text!==elem.text && e.value!==elem.value && e.text!==elem.text2 && e.value!==elem.value2 );  
    }
    revertFormatDate(fecha) {
        let fechaEntrada        = fecha
        let fechaSalida         = fechaEntrada.split('-')
        const fechafinal = fechaSalida[2]+'-'+fechaSalida[1]+'-'+fechaSalida[0]
        return fechafinal
    }
    mounted(){   
       this.newHeaders = this.eliminarCampoAction(this.headers,{text:'Action',value : 'action',text2:'Cliente',value2:'clientes.razon_social'});
    }
}

</script>
<style scoped>
.v-card__title{
    margin-top:-60px !important;
}
.v-card__subtitle, .v-card__text, .v-card__title {
    padding: 0px;
}
.v-application .success {
    background-color: #1D3768 !important;
    border-color: #1D3768 !important;
}
</style>