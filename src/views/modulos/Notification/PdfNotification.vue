<template>
    <div>
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
                    <TitleSection v-show="btn_atras" :sectiontitle="sectiontitle"/>
                    <div class="logo">
                        <img style="object-fit: cover;" src="img/logos_CONAPDIS/CABECERA.png"  alt="">
                    </div>
                    <div class="title_section">
                        <h2 class="mt-4">{{ title_section }}</h2>
                    </div>
                    <v-row class="titlenota">
                        <p>162º, 211º Y 22º</p>
                    </v-row>
                    <v-row class="title_tramite">
                        <p class="title_1">TRAMITAR ANTE EL CONSEJO NACIONAL PARA LAS PERSONAS CON DISCAPACIDAD (CONAPDIS)LA
                            CERTIFICACIÓN DECUMPLIMIENTO DE ACCESIBILIDAD, BUEN TRATO E INCLUSIÓN 
                            LABORAL(ABI) DE PERSONAS CON DISCAPACIDAD PERMANENTE
                        </p>
                  
                    </v-row >
                    <v-row class="title_tramite">
                        <p class="article">Constitución de la República Bolivariana de Venezuela 1999 – Artículo 81.
                            Convención Sobre los Derechos de las Personas con Discapacidad 2006 – Artículo 9.
                            Ley para las Personas con Discapacidad- G.O. N° 38.598 - 05/01/2007 - Artículos: 28, 31, 32,33, 35, 72 y 79.
                        </p>
                    </v-row>
    
                  <!--   <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="4">1.	DEL REGISTRO DE NOTIFICACIÓN:</th>
                            </tr>
                            <tr>
                              <td class="td-center bold">1.1 Planilla N° : </td>
                              <td class="td-center">{{ campo1 }}</td>
                              <td class="td-center bold">1.2 Numeral : </td>
                              <td class="td-center">{{ campo2 }}</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="4">2.	DATOS DE LA SEDE DE LA UNIDAD DE FISCALIZACIÓN:</th>
                            </tr>
                            <tr>
                                <td class="td-center bold">2.1 Región : </td>
                                <td colspan="2" class="td-center bold">2.2 Estado :</td>
                                <td class="td-center bold">2.3 Municipio </td>
                            </tr>
                            <tr>
                                <td class="td-center">{{ campo3}} </td>
                                <td colspan="2" class="td-center">{{ campo4 }}</td>
                                <td class="td-center">{{ campo5 }} </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="4">3.	DE LA DENOMINACIÓN DE LA ENTIDAD DE TRABAJO NOTIFICADA:</th>
                            </tr>
                            <tr>
                                <td colspan="4" class="td-center">{{ campo6}} </td>
                            </tr>
                        </table>
                    </v-row>
                    <v-row class="mt-5 parrafo">
                        <p><strong>SE INICIÓ EL PROCEDIMIENTO DE OFICIO QUEDANDO LA REFERIDA ENTIDAD DE TRABAJO
                            NOTIFICADA.</strong> A partir del día siguiente a la presente Notificación se contará
                            un plazo de quince <strong>(15)</strong> días hábiles para que la Entidad de Trabajo Notificada
                            consigne ante el Consejo Nacional para las Personas con Discapacidad <strong>(CONAPDIS)</strong>, 
                            la documentación requerida, para dar inicio al proceso de tramitación relativo a 
                            la <strong>CERTIFICACIÓN ABI</strong> . Anexándose para tal fin, lista de requisitos.
                        </p>
                    </v-row> -->
                    <!-- <div class="html2pdf__page-break"/> -->
                    <v-row class="title_tramite">
                        <p class="title_1">LISTA DE REQUISITOS PARA LA TRAMITACIÓN DEL  CERTIFICADO ABI DEL CONAPDIS  TRAMITADO POR PRIMERA VEZ
                        </p>
                    </v-row >
                    <v-row class="table">
                        <v-row class="renovacion">
                            <ul class="requeriments" >
                                <li style="list-style:none" v-for="(doc,index) in documents" :key="index"><strong>{{index+1 + '.-' }}</strong><strong>{{doc.title}}</strong>: {{doc.description}}</li>
                               
                            </ul>
                        </v-row>
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
 import documentModule from '@/store/modules/documentRequiredModule';
  
 export default {
     components: {
         VueHtml2pdf
     },
     data(){
         return{
             btnSave:'Generar PDF',
             btn_atras : true,
             title_section : 'NOTIFICACIÓN',
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
             /* {text: 'Fecha Recepción', value: 'ticketDate'}, */
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
             documents: []
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
             //console.log(event)
         },
  /*        async getNotificationById(id){
             const res = await notasModule.getNotaById(id);console.log(res,id)
             const customer = await invoiceModule.getCustomersById(this.getCustomerId)
             this.customer  = customer.nameLegal
             this.desserts = res
         }, */
         formatofecha(fecha) {
             var date = new Date(fecha);
             let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
             return  formatted_date;
         },
         async getDocuments(){
            this.overlay  = true
            const documents  = await  documentModule.getDocumentsAll();
            this.documents = documents.data.data;
            console.log( this.documents )
            this.overlay  = false
        },
     },
     mounted(){
         this.nota_entrega_id = this.$route.params.id
         this.notification = 'Notification ' + this.nota_entrega_id
         this.getDocuments()
        // this.getNotaById(this.nota_entrega_id)
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
 .renovacion{
    width: 80%;
    margin-left: 10%;
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
    width:100%;
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

 </style>

 
  
 

