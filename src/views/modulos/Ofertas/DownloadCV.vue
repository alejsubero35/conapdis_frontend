<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular
                indeterminate
                size="64"
                class="laoding"
            ></v-progress-circular>
        </v-overlay>
        <v-row>
     
        </v-row>
        <vue-html2pdf
         :show-layout="false"
         :float-layout="false"
         :enable-download="true"
         :preview-modal="true"
         :paginate-elements-by-height="1400"
         :filename="notification"
         :pdf-quality="2"
         :manual-pagination="false"
         pdf-format="letter"
         pdf-orientation="portrait"
         pdf-content-width="100%"
         @progress="onProgress($event)"
         @hasStartedGeneration="hasStartedGeneration()"
         @hasGenerated="hasGenerated($event)"
         ref="html2Pdf"
        >
            <section slot="pdf-content"  >
                <div class="form_contacto">                
                    <div class="text-center"><h1>CURRICULUM VITAE</h1></div>
                    <div class="logo">
                        <img style="object-fit: cover;width:150px" src="img/logos_conapdis/avatar.png"  alt="" >
                    </div><br>
                    <div class="td-center">
                        <h3>Eulemis Alfredo Hernandez Sanchez</h3>
                        <h3>16.092.842</h3>
                         <h3>Teléfonos : 04241523696 / 04120162547</h3>
                    </div><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                                <td colspan="2" >Fecha de Nacimiento : <strong>{{ region }}</strong> </td>
                                <td>Edad : <strong>{{ estado }}</strong></td>
                                <td>Sexo : <strong>{{ municipio }}</strong></td>
                                <td >Profesión :<strong>{{ parroquia }}</strong> </td>
                            </tr>
                            <tr>
                                <td colspan="2" >Grado de Instrucción: <strong>{{ region }}</strong> </td>
                                <td>N° Certificado : <strong>{{ municipio }}</strong></td>
                                <td colspan="4">Dirección : <strong>{{ estado }}</strong></td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>FORMACIÓN ACADÉMICA</h3></th>
                            </tr>
                            <tr>
                                <td style="text-align:center"><strong>Nivel </strong>{{ razonsocial }} </td>
                                <td style="text-align:center"><strong>Carrera </strong>{{ rif }} </td>
                                <td style="text-align:center"><strong>Instituto</strong>{{ rif }} </td>
                                <td style="text-align:center"><strong>Culminación</strong>{{ rif }} </td>
                                <td style="text-align:center"><strong>condición</strong>{{ rif }} </td>
                            </tr>
                               <tr>
                                <td style="text-align:center">{{ razonsocial }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>DATOS LABORALES</h3></th>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:center"><strong>Empresa</strong>{{ razonsocial }} </td>
                                <td style="text-align:center"><strong>Cargo</strong>{{ rif }} </td>
                                <td style="text-align:center"><strong>Inicio</strong>{{ rif }} </td>
                                <td style="text-align:center"><strong>Fin</strong>{{ rif }} </td>
                            </tr>
                               <tr>
                                <td  colspan="2"  style="text-align:center">{{ razonsocial }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                                <td style="text-align:center">{{ rif }} </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>IDIOMAS</h3></th>
                            </tr>
                            <tr>
                                <td colspan="3" style="text-align:center"><strong>Idioma</strong>{{ razonsocial }} </td>
                                <td colspan="2" style="text-align:center"><strong>Nivel</strong>{{ rif }} </td>
                            </tr>
                               <tr>
                                <td  colspan="3"  style="text-align:center">{{ razonsocial }} </td>
                                <td  colspan="2" style="text-align:center">{{ rif }} </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>HABILIDADES Y DESTREZAS</h3></th>
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align:center">{{ razonsocial }} </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>DISCAPACIDAD</h3></th>
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align:center">{{ razonsocial }} </td>
                            </tr>
                        </table>
                    </v-row>         
                    <div class="mt-5 d-flex justify-end ">
                        <v-btn  small @click="generateReport" color="success" v-show="btn_atras"  >{{ btnSave }}</v-btn> 
                    </div>
                </div>
            </section>
        </vue-html2pdf>
    </div>
 </template>
 <script>
 import VueHtml2pdf from 'vue-html2pdf'
 import inspeccionModule   from '@/store/modules/inspeccionModule';
 import storageData from '@/store/services/storageService'
  
 export default {
     components: {
         VueHtml2pdf
     },
     data(){
         return{
             btnSave:'Generar PDF',
             btn_atras : true,
             title_section : 'CONSEJO NACIONAL PARA LAS PERSONAS CON DISCAPACIDAD',
             campo1 : '001',
             campo2 : '1425',
             campo3 : 'Central',
             campo4 : 'Miranda',
             campo5 : 'Simón Bolívar',
             campo6 : 'Arrau Tecnology HDD, C.A',
             headers : [
                {text: 'Serial Equipo', value: 'serial' },
                {text: 'Módelo', value: 'serial'},
                {text: 'Plan', value: 'nombrePlan'},
                {text: 'Nombre Comercio', value: 'legalName'},
                {text: 'Falla Reportada', value: 'nameError'},
                {text: 'Factura', value: 'invoice'},
             ],
             desserts : [
 
             ],
             detalles : [
 
             ],
             notification : '',
             sectiontitle : '',
             nota_entrega_id : '',
             date : new Date(Date.now()),
             customer : '',
             numeroplanilla : '',
             fechaplanilla: '',
             expediente: '',
             solicitud: '',
             unidadfiscalizacion: '',
             razonsocial: '',
             rif: '',
             denominacioncomercial: '',
             region: '',
             estado: '',
             municipio: '',
             parroquia: '',
             direccion: '',
             overlay : false,
             currentUser : [],
             firstname: '',
             lastname: '',
             position: '',
             identitycard: '',
             phone: '',
             email: ''

         }
     },
     computed: {
     /*     getCustomerId() {
             return sessionModule.getCustomerId; 
         } */
     },
     methods: {
         generateReport () {
             this.btn_atras = false
             this.$refs.html2Pdf.generatePdf()
         },
         onProgress(event){
          
         },
         formatofecha(fecha) {
             var date = new Date(fecha);
             let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
             return  formatted_date;
         },
         async getPostulanteById(id){  
    
            this.overlay = true
            const {data} = await inspeccionModule.getPostulanteById(id)   
            let busine = (data.data.bussine) ? data.data.bussine : null

            this.numeroplanilla         = data.data.id
            this.fechaplanilla          = data.data.date
            this.expediente             = (data.data.expedient) ? data.data.expedient.num_expedient : ''
            this.solicitud              = data.data.id
            this.unidadfiscalizacion    = (data.data.inspection_unit) ? data.data.inspection_unit.name : ''
            this.razonsocial            = (busine) ? busine.company_name : ''
            this.rif                    = (busine) ? busine.rif : ''
            this.denominacioncomercial  = (busine) ? busine.comercial_designation : ''
            this.region                 = (data.data.country) ? data.data.country.name : ''
            this.estado                 = (data.data.state) ? data.data.state.name: ''
            this.municipio              = (data.data.municipality) ? data.data.municipality.name : ''
            this.parroquia              = (data.data.parishe) ? data.data.parishe.name : ''
            this.direccion              = (busine) ? busine.company_name : ''.location    
            this.firstname              = this.currentUser.first_name
            this.lastname               = this.currentUser.last_name
            this.position               = this.currentUser.position.name
            this.identitycard           = this.currentUser.number_document_identity 
            this.phone                  = this.currentUser.phone                  
            this.email                  = this.currentUser.email                             
            this.overlay = false 
        }
     },
     mounted(){
        this.nota_entrega_id = this.$route.params.id
        this.notification = 'CV ' + this.nota_entrega_id
        //this.getPostulanteById(this.$route.params.id)
        this.currentUser = storageData.get('_User');
        

     }
 }
 </script>
 <style scoped>
 .form_contacto{
     background: white;
     padding: 5%;
     border-radius: 8px;

     background-repeat: no-repeat;
     background-size: cover;
     background-position: center;
     height: auto;
     width: auto;
 }

 .encabezado{
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     line-height: 0.5;
     margin-left: 10%;
 }
 .titlenota{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    font-weight: bold;
 }
 .title_tramite{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
    width: 80%;
    margin: auto;

 }
 .article{
    font-size: 12px;
 }
 .title_1{
    font-weight: bold;
 }
 .logo{
     display: flex;
     flex-direction: row;
     align-items: center;
     justify-content: space-around;
     flex-wrap: wrap;
  
   
 }
 .title_section{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
 }
 .sub-title{
     margin-left: 10%;
 }
 img{
    object-fit: cover;
    width:82%;
    height:100%;
  }
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 80%;
    margin: auto;
  }
  
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  .td-center{
    text-align: center;
  }
  .bold{
    font-weight: bold;
  }
  .parrafo{
    width: 80%;
    margin: auto;
    font-size: 16px;
  }
  .inspeccion{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
.inter{
    font-size: 12px;
}
 </style>

 
  
 

