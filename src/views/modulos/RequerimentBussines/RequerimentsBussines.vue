<template>
    <div>
        <v-row>
     
        </v-row>
        <vue-html2pdf
         :show-layout="false"
         :float-layout="false"
         :enable-download="true"
         :preview-modal="true"
         :paginate-elements-by-height="1700"
         :filename="notification"
         :pdf-quality="2"
         :manual-pagination="true"
         pdf-format="legal"
         pdf-orientation="portrait"
         pdf-content-width="100%"
         @progress="onProgress($event)"
         @hasStartedGeneration="hasStartedGeneration()"
         @hasGenerated="hasGenerated($event)"
         ref="html2Pdf"
        >
            <section slot="pdf-content"  >
                <div class="form_contacto">
                    <section class="pdf-item">
                        <TitleSection v-show="btn_atras" :sectiontitle="sectiontitle"/>
                        <div class="logo">
                            <img style="object-fit: cover;" src="img/logos_CONAPDIS/CABECERA.png"  alt="">
                        </div>
                        <div class="title_section">
                            <h4 class="mt-4 text-center">CONSEJO NACIONAL<br> PARA LAS PERSONAS CON DISCAPACIDAD (CONAPDIS)</h4>
                        </div>
                        <v-row class="titlenota">
                            <p>162º, 211º Y 22º</p>
                        </v-row>
                        <v-row class="title_tramite">
                            <p class="title_1">LISTA DE REQUISITOS PARA LA TRAMITACIÓN DEL <br> CERTIFICADO ABI DEL CONAPDIS <br> TRAMITADO POR PRIMERA VEZ
                            </p>
                        </v-row >
                        <v-row class="table">
                            <v-row class="renovacion">
                                <ul class="requeriments" >
                                    <li style="list-style:none" v-for="(doc,index) in documents" :key="index"><strong>{{index+1 + '.-' }}</strong><strong>{{doc.title}}</strong>: {{doc.description}}</li>
                                   
                                </ul>
                            </v-row>
                        </v-row>
                    </section>
                    <div class="html2pdf__page-break"/>
                    <section class="pdf-item">
                        <div class=" justify-center mt-5">
                            <h5  class="mt-4 text-center">
                                TRÁMITE POR RENOVACIÓN:
                            </h5>
                        </div>
                        <v-row class="renovacion">
                            <ul>
                                <li style="list-style:none">1.	Presentar original y consignar una (1) copia fotostática de la cédula de identidad laminada y una (1) copia fotostática del RIF vigente del representante legal de la entidad de trabajo (persona natural).</li>
                                <li style="list-style:none"> 2.	Presentar original y  una (1) copia fotostática del último CERTIFICADO ABI que le ha sido emitido por el CONAPDIS.</li>
                            </ul>
                        </v-row>
                        <div class=" justify-center mt-5">
                            <h5  class="mt-4 text-center">
                                PAGO DE TRIBUTO
                            </h5>
                        </div>
                        <v-row class="renovacion mt-2">
                            <p>El cálculo de pago de Unidades Tributarias (U/T) se resolverá posteriormente a la 
                                instrucción del expediente y se notificará de la resolución a la Entidad de Trabajo, 
                                a fin de que un plazo de cinco (5) días hábiles contados a partir de la fecha de la 
                                notificación de la resolución, pague el monto que corresponda en las entidades bancarias 
                                que determine el CONAPDIS: </p>
                        </v-row>
               
                        <div style="margin-top:5%" class=" justify-center">
                            <h5 style="margin-left:10%; " >
                                ENTIDAD BANCARIA DETERMINADA PARA EL PAGO:
                            </h5>
                            <p style="margin-left:10%;"><strong>Banco del Tesoro:</strong>		Cuenta Nº 0163-09-00179003000068</p>
                            <p style="margin-left:10%;"><strong>Titular de la cuenta:	</strong>	CONAPDIS</p>
                            <p style="margin-left:10%;"><strong>RIF:</strong>			G-20000683-8</p>
                        </div>
                        <v-row class="renovacion mt-2">
                            <p><strong>NOTA:</strong> ¡”EVITA LOS GESTORES”!, el trámite ante esta Institución lo puede realizar un tercero, 
                                siempre que se trate de un trabajador (a) directo de la entidad de trabajo, para lo cual, 
                                debe ser autorizado a través de una carta poder preferiblemente membretada, firmada y sellada 
                                y acompañada de una (1) copia fotostática de la cédula de identidad tanto del trabajador como 
                                de la persona que autoriza y una (1) copia fotostática del carnet o constancia laboral del 
                                trabajador (a) autorizado.</p>
                        </v-row>
                    </section>
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
             title_section : '',
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
         async getDocuments(){
            this.overlay  = true
            const documents  = await  documentModule.getDocumentsAll();
            this.documents = documents.data.data;
            console.log( this.documents )
            this.overlay  = false
        },
         formatofecha(fecha) {
             var date = new Date(fecha);
             let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
             return  formatted_date;
         }
     },
     mounted(){
         this.nota_entrega_id = this.$route.params.id
         this.notification = 'Requisitos' 
         this.getDocuments()
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
    font-size: 14px;
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
.renovacion{
    width: 80%;
    margin:auto;
}
.requeriments{
    width: 80%;
    margin: auto;
    border: 1px solid;
    padding: 20px;
    border-radius: 10px;
}
 </style>

 
  
 

