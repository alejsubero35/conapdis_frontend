<template>
    <div>
    	<v-overlay :value="overlay">
        <v-progress-circular
            indeterminate
            size="64"
        ></v-progress-circular>
        </v-overlay>
        <v-data-table
         
                :headers="headers"
                :items="desserts"
                item-key="id"
                hide-select
                class="elevation-1 table-one"
                multi-sort
                :loading="loading"
                loading-text="Cargando Data... Por Favor Espere"
                :options.sync="options"
                :itemsPerPage="pagination.per_page"
                :server-items-length="pagination.total"  
                :footer-props="{
                    'items-per-page-options': [10, 15, 20, 30, 40, 50, -1],
                    'items-per-page-text':'Filtro por Página'
                    
                }" 
      
            
                >

                <template v-slot:item.action="{item}">
                    <div class="d-flex">
                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="success"
                                    dark
                                    @click="Edit(item.id)"   
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>mdi-pencil-box-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Editar</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    color="error"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    icon
                                    @click="Delete(item.id)"   
                                >
                                    <v-icon>mdi-trash-can-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Eliminar</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    v-if="section == 'Usuarios'"
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    icon
                                    @click="changePassword(item.id)"   
                                >
                                    <v-icon dark>mdi-account-key-outline</v-icon>
                                </v-btn>
                            </template>
                            <span>Cambiar Contraseña</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn
                                    v-if="section == 'notas'"
                                    color="primary"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    icon
                                    @click="imprimirPDF(item.id)"   
                                >
                                <v-icon dark>mdi-file-pdf-box</v-icon>
                                </v-btn>
                            </template>
                            <span>PDF</span>
                        </v-tooltip>
                    </div>
                </template>
        </v-data-table>
    </div>
</template>
<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import globalModule from '@/store/modules/globalModule';


@Component
export default class MainDataTable extends Vue {
    @Prop() readonly headers!: string
    @Prop() readonly desserts!: any
    @Prop() readonly itemsPerPage!: any
    @Prop() readonly loading!: boolean
    @Prop() readonly title!: string
    @Prop() readonly section!: string
    @Prop() readonly endpoint!: string
    @Prop() readonly typeUser!: string
    selected: Object = []
    page : any = {}
    overlay : boolean = false
    data = {
        page:null,
        endpoint:this.endpoint,
        itemsPerPage:null
    }
    pagination :any = {
        current_page : 0,
        from : 0,
        last_page : 0,
        per_page : 0,
        to : 0,
        total : 0
    }
    expanded = []
    singleExpand : boolean = false
    contador = 0
    options = {}
    @Watch('options', { immediate: false })
    handler (page) {
        this.activarPaginate(page)
    }
    Edit(id){
        this.$emit('edit',id)
    }
    Delete(id){
        this.$emit('delete',id)
    }
    activarPaginate(page){
        console.log(page)
        this.contador = 0
        if (page.itemsPerPage == -1) {
            this.data.page = page.page
            this.data.itemsPerPage = page.itemsLength
        } else {
            this.data.page = page.page
            this.data.itemsPerPage = page.itemsPerPage
        } 

        this.dataPaginate(this.data)
  
    }
    changePassword(id){
        this.$emit('changePassword',id) 
    }
    imprimirPDF(item){
       this.$emit('createPDF',item) 
    }

    async dataPaginate(dataSubmit){  
    
        this.overlay = true
            let paginateData : any = [];
            const {data,status} : any = await globalModule.dataPaginate(dataSubmit)   
            console.log(data,status)
            paginateData = data.data
            this.$emit('updateData', paginateData); 
        this.overlay = false 
    }
    setDecimalesPrice(precio:any) {
        let t=precio.toString();
        let regex=/(\d*.\d{0,2})/;
        return t.match(regex)[0];
    }
    formatofecha(fecha) {
        var date = new Date(fecha);
        let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
        return  formatted_date;
    }
    getColor (item) {
        if (item > 0) return 'primary'
        else return 'danger'
    }

    mounted(){
        console.log(this.desserts)
    }

}
</script>
<style lang="scss" scoped>
::v-deep .table-one {
    thead.v-data-table-header {
        tr {
            &:hover {
                background-color: #f2f3f8;
            }
            th {
                span {
                    font-size: 16px;
                    color: #304156;
                }
            }
        }
        tr {
            td {
                padding-bottom: 20px;
                padding-top: 20px;
            }
        }
    }
    tbody {
        tr {
            &:hover {
                background-color: #f2f3f8 !important;
            }
        }
    }
    .mdi-pencil-box-outline{
        color: #2B8942; 
    }
    .mdi-trash-can-outline{
        color:#000000
    }
    .theme--light.v-data-table {
        background-color: #FFFFFF;
        color: rgba(0, 0, 0, 0.87);
        border-radius: 15px !important;
    }

}
</style>
