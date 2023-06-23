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
                    <div class="title_section">
                        <h6 class="mt-4">{{ title_section }}</h6>
                    </div><br>
                    <div class="text-center"><h4>1.	PLANILLA DE SOLICITUD DE INSPECCIÓN</h4></div>
                    <div class="inspeccion">
                        <div>a) Planilla N° : <strong>{{ numeroplanilla }}</strong></div>
                        <div>b) Fecha : <strong>{{ fechaplanilla }}</strong></div>
                    </div><br><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="5">2.	DEL REGISTRO DE LA SOLICITUD:</th>
                            </tr>
                            <tr>
                              <td  colspan="2">a. Expediente N°: <strong>{{ expediente }}</strong> </td>
                              <td  colspan="2"  >b. Solicitud N°: <strong>{{ solicitud }}</strong></td>
                              <td  colspan="2"  >c. Unidad de Fiscalización: <strong>{{ unidadfiscalizacion }}</strong></td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">3.	DE LOS DATOS DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                            </tr>
                            <tr>
                                <td  colspan="2"  style="border-right:none">a. Razón Social : <strong>{{ razonsocial }}</strong> </td>
                                <td style="border:none"></td>
                                <td style="border:none"></td>
                                <td  colspan="2">b. R.I.F: <strong>{{ rif }}</strong> </td>
                            </tr>
                            <tr>
                                <td colspan="5">c.	Denominación Comercial: <strong>{{ denominacioncomercial }}</strong> </td>
                        
                            </tr>
                            <tr>
                                <td colspan="2" >d.	Región: <strong>{{ region }}</strong> </td>
                                <td>e.	Estado: <strong>{{ estado }}</strong></td>
                                <td>f.	Municipio: <strong>{{ municipio }}</strong></td>
                                <td >g.	Parroquia: <strong>{{ parroquia }}</strong> </td>
                            </tr>
                            <tr>
                                <td colspan="5">h.	Dirección: <strong>{{ direccion }}</strong> </td>
                        
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">4.	DE LOS DATOS DEL ADMINISTRADO O SOLICITANTE:</th>
                            </tr>
                            <tr>
                                <td colspan="2">a.	Nombre (s): <strong>{{ firstname }}</strong></td>
                                <td colspan="2">b.	Apellido (s): <strong>{{ lastname }}</strong></td>
                                <td colspan="2">c.	C. I. N°: <strong>{{ identitycard }}</strong></td>
                              </tr>
                            <tr>
                                <td colspan="2">d.	Cargo: <strong>{{ position }}</strong></td>
                                <td colspan="2" rowspan="3"></td>
                                <td  rowspan="3"></td>
                            </tr>
                            <tr>
                                <td colspan="2">e.	Telefono N°: <strong>{{ phone }}</strong></td>
                              
                            </tr>
                            <tr>
                                <td colspan="2">f.	E-mail: <strong>{{ email }}</strong></td>
                            
                            </tr>
                        </table>
                    </v-row>
                    <v-row class="mt-5 parrafo">
                        <p class="text-center inter">Av. Casanova con Calle Villa Flor. Edificio Centro Profesional del Este. Piso Mezzanina 1. Oficina Edificio Anexo. Sector El Recreo
                            Caracas Distrito Capital. Zona Postal 1050. Números telefónicos: (0212) 762.00.39 / 762.96.45
                            www.conapdis.gob.ve  /  fiscalizacion@conapdis.gob.ve  /  @conapdis
                            
                        </p>
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
        this.notification = 'Notification ' + this.nota_entrega_id
        this.getSolicitudById(this.$route.params.id)
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

 
  
 

