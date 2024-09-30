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
                        label="Seleccione filtro"
                        placeholder="Seleccione Filtro"
                        outlined
                        dense
                        @change="filterSearch($event)"
                    ></v-select>
                </v-col>
            <v-text-field
                @keyup.enter="searchData()"
                v-model="query"
                :label="label"
                single-line
                hide-details
            ></v-text-field>
            <v-btn
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
        endpoint:this.endpoint
    }

    filterSearch(event){
        this.data.filter = event
    }
    
 	async searchData() {
	 	this.overlay = true
         if(this.data.filter == 'invoice_date' || this.data.filter == 'selldate'){
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
</style>