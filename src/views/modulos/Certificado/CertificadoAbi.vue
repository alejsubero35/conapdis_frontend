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
                    <div class="inspeccion">
                        <div></div>
                        <div>N° Certificado</div>
                    </div><br><br>
                    <div class="text-center">
                        <h1 class="title_certificado">CERTIFICADO ABI</h1>
                        <h2 class="title_certificado">ACCESIBILIDAD – BUEN TRATO – INSERCIÓN LABORAL</h2>

                    </div>
                    <v-row class="mt-5 parrafo">
                        <p class="">El CONSEJO NACIONAL PARA LAS PERSONAS CON DISCAPACIDAD, 
                            en acatamiento a lo establecido en el artículo 81 de la Constitución de la República Bolivariana de Venezuela;
                            concatenado con los artículos 3 literales “b” y “f”; artículo 4 literal “e”; artículo 5 numeral 2; artículo 8 literal 
                            “c”; artículo 9 numeral 1 literal “a” y “b”; y, numeral 2 literales “a”, “b” y “d” de la Convención Sobre los Derechos 
                            de las Personas con Discapacidad; y, los artículos 4, 31, 32 y 35 de la Ley para las Personas con Discapacidad 
                            GO Nº 38.598 de fecha 05/01/2007; CERTIFICA que, la entidad de trabajo o razón social denominada:
                            
                        </p>
                    </v-row><br>
                    <div class="text-center">
                        <h1 >PRUEBA DEL CERTIFICADO ABI, C.A</h1>
                        <h2 >RIF: J-00000000-1</h2>
                    </div><br><br>
                    <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="5">ENTIDAD UBICADA EN:</th>
                            </tr>
                            <tr>
                                <td>Estado:</td>
                                <td>Municipio:</td>
                                <td>Parroquia: </td>
                            </tr>
                            
                        </table>
                    </v-row><br>
                    <v-row class="mt-5 parrafo">
                        <p class="">Cumple con lo dispuesto en la convención sobre los derechos de las personas con discapacidad; 
                            la ley para las personas con discapacidad; demás normas jurídicas; y, las normas y reglamentaciones 
                            técnicas COVENIN o FONDONORMA en materia de accesibilidad. En consecuencia, en uso de las atribuciones 
                            conferidas por el artículo 58 numeral 1, 3 y 8 de la ley para las personas con discapacidad, 
                            la Presidencia del Consejo Para las Personas con Discapacidad, otorga el presente <strong>“CERTIFICADO ABI” 
                                (ACCESIBILIDAD, BUEN TRATO E INSERCIÓN LABORAL)”</strong>, válido por un (1) año, por lo que deberá renovarse anualmente.
                            
                        </p>
                    </v-row>
                    <v-row class="mt-5 parrafoend">
                        <p class="">Se advierte que cualquier modificación a la edificación donde funciona la 
                            entidad de trabajo o razón social o alteración efectuada a la condición de las edificaciones 
                            y su entorno urbano que garantiza o facilita a las personas su ingreso, el recorrido, 
                            su utilización y el egreso de las mismas en forma segura, autónoma y cómoda; 
                            sin la debida aprobación de esta Institución <strong>(CONAPDIS)</strong>, invalidará el presente 
                            Certificado y dará lugar a las sanciones previstas en las leyes que rigen la materia.
                            
                        </p>
                    </v-row><br>
                    <div class="footer">
                        <div>
                            <h4>INSPECTOR ACTUANTE :</h4>
                            <h4>EXPEDIENTE Nº:</h4>
                            <h4>FECHA DE EXPEDICIÓN:</h4>
                        </div>
                        <div>
                            <h4>PROVIDENCIA ADMINISTRATIVA N. º:</h4>
                            <h4>UNIDAD DE FISCALIZACIÓN:</h4>
                            <h4>FECHA DE VENCIMIENTO:</h4>
                        </div>
                    </div><br><br>
                    <div class="text-center mt-5 director">
                        <p>SOC. SORAIDA RAMÍREZ OSORIO</p>
                        <p>Presidenta del Consejo Nacional para las Personas con Discapacidad</p>
                        <p>Decreto Presidencial N. º 1551 de fecha 22/12/2014</p>
                        <p>Gaceta Oficial N. º 40.567 de fecha 22/12/2014</p>
                    </div><br><br>
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
  .parrafoend{
    width: 80%;
    margin: auto;
    font-size: 12px;
  }
  .inspeccion{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
.inter{
    font-size: 12px;
}
.title_certificado{
    color: red;
}
.footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
}
.director{
    line-height: 0.5;
}
 </style>

 
  
 

