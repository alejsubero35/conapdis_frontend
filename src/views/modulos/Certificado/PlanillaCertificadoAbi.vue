<template>
    <div>
        <v-row>
     
        </v-row>
        <vue-html2pdf
         :show-layout="false"
         :float-layout="false"
         :enable-download="false"
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
            <section slot="pdf-content" class="form_contacto" >
                <section class="pdf-item">
                        <div class="logo">
                            <img style="object-fit: cover;" src="img/logos_conapdis/CABECERA.png"  alt="">
                        </div>
                        <div class="title_section">
                            <h6 class="mt-4">{{ title_section }}</h6>
                        </div><br>
                        <div class="inspeccion">
                            <div></div>
                            <div>N° Certificado : <strong>{{numcertificate}}</strong></div>
                        </div><br><br>
                        <div class="text-center">
                            <h3 class="title_certificado">CERTIFICADO ABI</h3>
                            <h5 class="title_certificado">ACCESIBILIDAD – BUEN TRATO – INSERCIÓN LABORAL</h5>
    
                        </div>
                        <v-row class="mt-5 parrafo">
                            <p style="font-size:14px">El CONSEJO NACIONAL PARA LAS PERSONAS CON DISCAPACIDAD, 
                                en acatamiento a lo establecido en el artículo 81 de la Constitución de la República Bolivariana de Venezuela;
                                concatenado con los artículos 3 literales “b” y “f”; artículo 4 literal “e”; artículo 5 numeral 2; artículo 8 literal 
                                “c”; artículo 9 numeral 1 literal “a” y “b”; y, numeral 2 literales “a”, “b” y “d” de la Convención Sobre los Derechos 
                                de las Personas con Discapacidad; y, los artículos 4, 31, 32 y 35 de la Ley para las Personas con Discapacidad 
                                GO Nº 38.598 de fecha 05/01/2007; CERTIFICA que, la entidad de trabajo o razón social denominada:
                                
                            </p>
                        </v-row><br>
                        <div class="text-center">
                            <h2>{{razonsocial}}</h2>
                            <h3 >{{rif}}</h3>
                        </div><br><br>
                        <v-row class="table">
                            <table>
                                <tr>
                                  <th class="td-center" colspan="5">ENTIDAD UBICADA EN:</th>
                                </tr>
                                <tr>
                                    <td>Estado: <strong>{{estado}}</strong></td>
                                    <td>Municipio: <strong>{{municipio}}</strong></td>
                                    <td>Parroquia: <strong>{{parroquia}}</strong> </td>
                                </tr>
                                
                            </table>
                        </v-row><br>
                        <v-row class="mt-5 parrafo">
                            <p style="font-size:14px">Cumple con lo dispuesto en la convención sobre los derechos de las personas con discapacidad; 
                                la ley para las personas con discapacidad; demás normas jurídicas; y, las normas y reglamentaciones 
                                técnicas COVENIN o FONDONORMA en materia de accesibilidad. En consecuencia, en uso de las atribuciones 
                                conferidas por el artículo 58 numeral 1, 3 y 8 de la ley para las personas con discapacidad, 
                                la Presidencia del Consejo Para las Personas con Discapacidad, otorga el presente <strong>“CERTIFICADO ABI” 
                                    (ACCESIBILIDAD, BUEN TRATO E INSERCIÓN LABORAL)”</strong>, válido por un (1) año, por lo que deberá renovarse anualmente.
                                
                            </p>
                        </v-row>
                    </section>
                    <div class="html2pdf__page-break"/>
                    <section class="pdf-item">
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
                                <h6>FISCAL ACTUANTE : <strong>{{firstnameinspector}}</strong></h6>
                                <h6>EXPEDIENTE Nº: <strong>{{expedient}}</strong></h6>
                                <h6>FECHA DE EXPEDICIÓN: <strong>{{date_certificate}}</strong></h6>
                            </div>
                            <div>
                                <h6>PROVIDENCIA ADMINISTRATIVA N. º: <strong>{{providence}}</strong></h6>
                                <h6>UNIDAD DE FISCALIZACIÓN: <strong>{{unidad}}</strong></h6>
                                <h6>FECHA DE VENCIMIENTO: <strong>{{due_date}}</strong></h6>
                            </div>
                        </div><br><br>
                        <div class="text-center mt-5 director">
                            <p>SOC. SORAIDA RAMÍREZ OSORIO</p>
                            <p>Presidenta del Consejo Nacional para las Personas con Discapacidad</p>
                            <p>Decreto Presidencial N. º 1551 de fecha 22/12/2014</p>
                            <p>Gaceta Oficial N. º 40.567 de fecha 22/12/2014</p>
                        </div><br><br>
                        <v-row class=" parrafo">
                            <p class="text-center inter">Av. Casanova con Calle Villa Flor. Edificio Centro Profesional del Este. Piso Mezzanina 1. Oficina Edificio Anexo. Sector El Recreo
                                Caracas Distrito Capital. Zona Postal 1050. Números telefónicos: (0212) 762.00.39 / 762.96.45
                                www.conapdis.gob.ve  /  fiscalizacion@conapdis.gob.ve  /  @conapdis
                                
                            </p>
                        </v-row>
                   
                   
        
                        <div class="mt-5 d-flex justify-end ">
                            <v-btn  small @click="generateReport" color="success" v-show="btn_atras"  >{{ btnSave }}</v-btn> 
                        </div>
                
                </section>
            </section>
        </vue-html2pdf>
    </div>
 </template>
 <script>
 import VueHtml2pdf from 'vue-html2pdf'
 import certificateModule            from '@/store/modules/certificateModule';
  
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

    notification : '',
    sectiontitle : '',
    nota_entrega_id : '',
    date : new Date(Date.now()),
    customer : '',
    numcertificate:'',
    razonsocial:'',
    rif:'',
    estado:'',
    municipio:'',
    parroquia:'',
    firstnameinspector:'',
    date_certificate:'',
    due_date:'',
    providence:'',
    expedient:'',
    unidad:''
    }
    },
    methods: {
        generateReport () {
            this.btn_atras = false
            this.$refs.html2Pdf.generatePdf()
        },
        onProgress(event){
            //console.log(event)
        },
        async getCertificateById(id){
            const {data} = await certificateModule.getCertificateById(id);
            this.numcertificate             = data.data.number_certificate
            this.razonsocial                = data.data.busine.company_name
            this.rif                        = data.data.busine.rif
            this.estado                     = data.data.busine.state.name
            this.municipio                  = data.data.busine.municipality.name
            this.parroquia                  = data.data.busine.parishe.name
            this.firstnameinspector         = data.data.user_id_inspector.first_name+' '+data.data.user_id_inspector.last_name
            this.date_certificate           = data.data.date_certificate
            this.due_date                   = data.data.due_date
            this.providence                 = data.data.user_id_inspector.providence_administrative
            this.expedient                  = data.data.guide.expedient.num_expedient
            this.unidad                     = data.data.guide.inspection_unit.name
       

        },
        formatofecha(fecha) {
            var date = new Date(fecha);
            let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            return  formatted_date;
        }
    },
    mounted(){
        this.certificate_id = this.$route.params.id
        this.notification = 'Certificado ' + this.certificate_id
        this.getCertificateById(this.$route.params.id)
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
    font-size: 14px;
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

 
  
 

