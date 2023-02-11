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
                        <h6 class="mt-4">{{ title_section }}</h6>
                    </div><br>
                    <div class="text-center"><h4>1.	PLANILLA DE SOLICITUD DE INSPECCIÓN</h4></div>
                    <div class="inspeccion">
                        <div>a) Planilla N° : ______________ <br> Para ser llenado por el administrado o solicitante:</div>
                        <div>b) Fecha : __/__/____</div>
                    </div><br><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="5">2.	DEL REGISTRO DE LA SOLICITUD:</th>
                            </tr>
                            <tr>
                              <td class=" bold" colspan="2">a. Expediente N°: </td>
                              <td  colspan="2"  class=" bold">b. Solicitud N°:</td>
                              <td  colspan="2"  class=" bold">c. Unidad de Fiscalización:</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">3.	DE LOS DATOS DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2"  style="border-right:none">a. Razón Social : </td>
                                <td style="border:none"></td>
                                <td style="border:none"></td>
                                <td class=" bold" colspan="2">b. R.I.F: </td>
                            </tr>
                            <tr>
                                <td colspan="5">c.	Denominación Comercial: </td>
                        
                            </tr>
                            <tr>
                                <td >d.	Región: </td>
                                <td style="border:none"></td>
                                <td>e.	Estado:</td>
                                <td>f.	Municipio:</td>
                                <td >g.	Parroquia: </td>
                            </tr>
                            <tr>
                                <td colspan="5">h.	Dirección: </td>
                        
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">4.	DE LOS DATOS DEL ADMINISTRADO O SOLICITANTE:</th>
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2">a.	Nombre (s):</td>
                                <td  colspan="2"  class=" bold">b.	Apellido (s):</td>
                                <td  colspan="2"  class=" bold">c.	C. I. N°:</td>
                              </tr>
                            <tr>
                                <td colspan="2">d.	Cargo:</td>
                                <td colspan="2" rowspan="3"></td>
                                <td  rowspan="3"></td>
                            </tr>
                            <tr>
                                <td colspan="2">e.	Telefono N°:</td>
                              
                            </tr>
                            <tr>
                                <td colspan="2">f.	E-mail:</td>
                            
                            </tr>
                        </table>
                    </v-row>
                    <v-row class="mt-5 parrafo">
                        <p class="text-center inter">Av. Casanova con Calle Villa Flor. Edificio Centro Profesional del Este. Piso Mezzanina 1. Oficina Edificio Anexo. Sector El Recreo
                            Caracas Distrito Capital. Zona Postal 1050. Números telefónicos: (0212) 762.00.39 / 762.96.45
                            www.conapdis.gob.ve  /  fiscalizacion@conapdis.gob.ve  /  @conapdis
                            
                        </p>
                    </v-row>
                    <div class="text-center"><h4>1.	CONSTANCIA DE RECEPCIÓN DE DOCUMENTOS</h4></div>
                    <div class="inspeccion">
                        <div>a) Planilla N° : ______________ <br> Para ser llenado por el Funcionario Receptor:</div>
                        <div>b) Fecha : __/__/____</div>
                    </div><br><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="5">2.	DE LOS DATOS DEL EXPEDIENTE:</th>
                            </tr>
                            <tr>
                              <td class=" bold" colspan="2">a. Expediente N°: </td>
                              <td  colspan="2"  class=" bold">b. Solicitud N°:</td>
                              <td  colspan="2"  class=" bold">c. Unidad de Fiscalización:</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">3.	DE LOS DATOS DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2"  style="border-right:none">a. Razón Social : </td>
                                <td style="border:none"></td>
                                <td style="border:none"></td>
                                <td class=" bold" colspan="2">b. R.I.F: </td>
                            </tr>
                            <tr>
                                <td colspan="5">c.	Denominación Comercial: </td>
                        
                            </tr>
                            <tr>
                                <td >d.	Región: </td>
                                <td style="border:none"></td>
                                <td>e.	Estado:</td>
                                <td>f.	Municipio:</td>
                                <td >g.	Parroquia: </td>
                            </tr>
                            <tr>
                                <td colspan="5">h.	Dirección: </td>
                        
                            </tr>
                            <tr>
                                <td colspan="5">NOTAS:1. La presente se emite “ÚNICAMENTE PARA DEJAR CONSTANCIA DE LA RECEPCIÓN DE LOS DOCUMENTOS” requeridos por el Consejo Nacional para las Personas con Discapacidad (CONAPDIS), como parte de los trámites que debe realizar el administrado para optar al  “Certificado de Cumplimiento ABI” (Accesibilidad – Buen Trato – Inclusión Laboral) Derechos de las Personas con Discapacidad.
                                    2. Es indispensable conservar y presentar esta constancia el día pautado para la Inspección.
                                </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">4.	DE LOS DATOS DEL ADMINISTRADO O SOLICITANTE:</th>
                              
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2">a.	Nombre (s):</td>
                                <td  colspan="2"  class=" bold">b.	Apellido (s):</td>
                                <td  colspan="2"  class=" bold">c.	C. I. N°:</td>
                              </tr>
                            <tr>
                                <td colspan="2">d.	Cargo:</td>
                                <td colspan="2" rowspan="3"></td>
                                <td  rowspan="3"></td>
                            </tr>
                            <tr>
                                <td colspan="2">e.	Telefono N°:</td>
                              
                            </tr>
                            <tr>
                                <td colspan="2">f.	E-mail:</td>
                            
                            </tr>
                        </table>
                    </v-row>
                    <v-row class="mt-5 parrafo">
                        <p class="text-center inter">Av. Casanova con Calle Villa Flor. Edificio Centro Profesional del Este. Piso Mezzanina 1. Oficina Edificio Anexo. Sector El Recreo
                            Caracas Distrito Capital. Zona Postal 1050. Números telefónicos: (0212) 762.00.39 / 762.96.45
                            www.conapdis.gob.ve  /  fiscalizacion@conapdis.gob.ve  /  @conapdis
                            
                        </p>
                    </v-row>
                  <!--   <div class="mt-5 d-flex justify-end ">
                        <v-btn  small @click="generateReport" color="success" v-show="btn_atras"  >{{ btnSave }}</v-btn> 
                    </div> -->
                </div>
            </section>
        </vue-html2pdf>
    </div>
 </template>
 <script>
 import VueHtml2pdf from 'vue-html2pdf'

  
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
             customer : ''
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
         }
     },
     mounted(){
         this.nota_entrega_id = this.$route.params.id
         this.notification = 'Notification ' + this.nota_entrega_id
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

 
  
 

