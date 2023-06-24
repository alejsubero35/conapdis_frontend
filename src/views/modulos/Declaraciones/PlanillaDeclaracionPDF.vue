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
                  
                    <div class="logo">
                        <img style="object-fit: cover;" src="img/logos_conapdis/CABECERA.png"  alt="">
                    </div>
                    <div class="text-center" style="font-size:12px;font-weight:bold"><p>PLANILLA DECLARACIÓN DE PERSONAS CON DISCAPACIDAD INSERTADAS LABORALMENTE</p></div>
                    <div class="text-center" style="font-size:12px;font-weight:bold"><p>REGISTRO DEL SECTOR EMPLEADOR Y DECLARACIÓN DE EMPLEADOS CON DISCAPACIDAD</p></div>
                    <div style="float:left;margin-left:10%">
                        <div > N° Declaración : </div>
                    </div><br><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                                <th class="td-center" colspan="6">DATOS DE LA DECLARACIÓN</th>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Rif : {{ rif }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Razón Social: {{ razonsocial }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Sector : {{ rif }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Tipo: {{ rif }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">N° Patrol IVSS : {{ ivss }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Objeto: {{ object }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Actividad Económica : {{ rif }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Teléfono: {{ phone }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Dirección : {{ location }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Correo Electrónico: {{ email }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Estado : {{ rif }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Municipio: {{ rif }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Semestre a Declarar : {{ semestre }} </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">Cant. Trabajadores sin discapacidad: {{ cant_trabajadores }}</td>
                            </tr>
                            <tr>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">% de trabajadores con discapacidad que deberia tener : 5 % </td>
                                <td  colspan="3" style="font-size:12px;font-weight:bold">N° total de trabajadores con discapacidad: {{ cant_trabajadores_discapacidad }}</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="6">Lista de Trabajadores con Discapacidad para este Semestre</th>
                            </tr>
                        </table>
                    </v-row>         
                    <div class="mt-5 d-flex justify-end ">
                        <v-btn  small @click="generateReport" color="success" v-show="btn_atras"  >{{ btnSave }}</v-btn> 
                    </div>
                    <!-- <div>   <img alt="Código QR" id="codigo"  width="80"></div> -->
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
            rif: '',
            razonsocial: '',
            estado: '',
            municipio: '',
            parroquia: '',
            direccion: '',
            overlay : false,
            currentBussine : [],
            firstname: '',
            lastname: '',
            position: '',
            identitycard: '',
            phone: '',
            email: '',
            ivss:'',
            object:'',
            notification: '',
            semestre: '',
            dataDeclaracion: {},
            cant_trabajadores:'',
            cant_trabajadores_discapacidad : '',
            location: ''

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
         async getSolicitudById(id){  
    
            this.overlay = true
            const {data} = await inspeccionModule.getSolicitudById(id)   
            let busine = (data.data.bussine) ? data.data.bussine : null

            this.numeroplanilla         = data.data.id
            this.fechaplanilla          = data.data.date
            this.expediente             = (data.data.expedient) ? data.data.expedient.num_expedient : ''
            this.solicitud              = data.data.id
            this.unidadfiscalizacion    = (data.data.inspection_unit) ? data.data.inspection_unit.name : ''
            this.razonsocial            = (busine) ? busine.company_name : ''
            this.rif                    = this.currentBussine.rif 
            this.denominacioncomercial  = (busine) ? busine.comercial_designation : ''
            this.region                 = (data.data.country) ? data.data.country.name : ''
            this.estado                 = (data.data.state) ? data.data.state.name: ''
            this.municipio              = (data.data.municipality) ? data.data.municipality.name : ''
            this.parroquia              = (data.data.parishe) ? data.data.parishe.name : ''
            this.direccion              = (busine) ? busine.company_name : ''.location    
            this.firstname              = this.currentBussine.first_name
            this.lastname               = this.currentBussine.last_name
            this.position               = this.currentBussine.position.name
            this.identitycard           = this.currentBussine.number_document_identity 
            this.phone                  = this.currentBussine.phone                  
            this.email                  = this.currentBussine.email                             
            this.overlay = false 
        },
        Qr(){
            new QRious({
            element: document.querySelector("#codigo"),
            value: "https://parzibyte.me/blog", // La URL o el texto
            size: 200,
            backgroundAlpha: 0, // 0 para fondo transparente
            foreground: "#8bc34a", // Color del QR
            level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
            });
        }
     },
     mounted(){
        this.Qr()
        if(this.$route.params.item){
            this.dataDeclaracion = this.$route.params.item
        }
     
        console.log(this.$route.params.item)
        this.notification = 'Declaración ' + this.$route.params.item.id
    
        if (storageData.get('_bussines') !== null) {
            this.currentBussine                 = storageData.get('_bussines');
            this.rif                            = this.currentBussine.rif 
            this.razonsocial                    = this.currentBussine.company_name
            this.ivss                           = this.currentBussine.employer_number_ivss
            this.object                         = this.currentBussine.comercial_designation
            this.location                       = this.currentBussine.location
            this.phone                          = this.currentBussine.phone 
            this.email                          = this.currentBussine.email_r
            this.semestre                       = this.dataDeclaracion.nombre
            this.cant_trabajadores              = parseInt(this.dataDeclaracion.numero_total_trabajadores) - parseInt(this.dataDeclaracion.personas_discapacidades)
            this.cant_trabajadores_discapacidad = this.dataDeclaracion.personas_discapacidades
        }
        

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

 
  
 

