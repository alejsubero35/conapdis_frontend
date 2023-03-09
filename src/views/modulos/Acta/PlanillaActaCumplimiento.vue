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
                    </div><br>
                    <div class="text-center"><h4>1.	ACTA DE CUMPLIMIENTO</h4></div>
                    <div class="inspeccion">
                        <div>a) Planilla N° : ______________ </div>
                        <div>b) Fecha : __/__/____</div>
                        <div>b) Hora : ____:____</div>
                    </div><br><br>
    
                    <v-row class="table">
                        <table>
                            <tr>
                              <th class="td-center" colspan="5">2.	DE LOS DATOS DE LA IDENTIDAD DE TRABAJO O RAZÓN SOCIAL OBJETO DE INSPECCIÓN:</th>
                            </tr>
                            <tr>
                              <td  colspan="4"  class=" bold">2.1.	Razón Social:</td>
                              <td  colspan="2"  class=" bold">2.2.	R.I.F. N°:</td>
                            </tr>
                            <tr>
                                <td colspan="4">Empresas Polar</td>
                                <td colspan="2">J-123456789-0</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">2.3 Denominación Comercial:</th>
                            </tr>
                            <tr>
                                <td colspan="2"  class=" bold">2.4 Región</td>
                                <td  class=" bold">2.5 Estado</td>
                                <td  class=" bold">2.6 Municipio</td>
                                <td  class=" bold">2.7 Parroquia</td>
                            </tr>
                            <tr>
                                <td colspan="2">Central</td>
                                <td>Miranda</td>
                                <td>Simón Bolívar</td>
                                <td>San Antonio de Yare</td>
                            </tr>
                            <tr>
                                <td colspan="5"  class=" bold">2.8 Ubicación</td>
                            </tr>
                            <tr>
                                <td colspan="5">San Francisco de Yare, Edo. Miranda</td>
                            </tr>
                            <tr>
                                <td class=" bold" colspan="3">2.9 N° Teléfono</td>
                                <td class=" bold" colspan="3">2.10 Email</td>        
                            </tr>
                            <tr>
                                <td colspan="3">0414-2513698</td>
                                <td colspan="3">empresaprueba@gmail.com</td>        
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">3. DEL REGISTRO DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                            </tr>
                            <tr>
                                <td colspan="2" class="bold">3.1 Expediente N° :</td>
                                <td colspan="2" class="bold">3.2 Solicitud de Inspección N°:</td>
                                <td colspan="2" class="bold">3.3 Unidad de Fiscalización:</td>
                            </tr>
                            <tr>
                                <td colspan="2">4524785986</td>
                                <td colspan="2">521</td>
                                <td colspan="2">1ra AMC</td>
                            </tr>
                            <tr>
                                <td colspan="2"  class=" bold">3.4 Guía de Inspección Técnica N°:</td>
                                <td  class=" bold">3.5 Fecha de la Guía Inspección:</td>
                                <td  class=" bold">3.6 Boleta de Ordenamientos N°:</td>
                                <td  class=" bold">3.7 Fecha de la Boleta de ordenamientos:</td>
                            </tr>
                            <tr>
                                <td colspan="2">0001</td>
                                <td>06/02/2023</td>
                                <td>5252</td>
                                <td>06/02/2023</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">4.DEL REPRESENTANTE LEGAL DE LA ENTIDAD DE TRABAJO O RAZÓN SOCIAL:</th>
                            </tr>
                            <tr>
                                <td colspan="2"  class=" bold">4.1 Nombre(s)</td>
                                <td  class=" bold">4.2 Apellido(s)</td>
                                <td  class=" bold">4.3 C.I.N°</td>
                                <td  class=" bold">4.4 Cargo</td>
                            </tr>
                            <tr>
                                <td colspan="2">Juan José</td>
                                <td>Perez Perez</td>
                                <td>20222111</td>
                                <td>Supervisor</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">5. DE LOS DATOS DEL ADMINISTRADO (A) DESIGNADO (A) PARA PRACTICAR LA INSPECCIÓN:</th>
                            </tr>
                            <tr>
                                <td colspan="2" class="bold">5.1 Nombre(s):</td>
                                <td colspan="2" class="bold">5.2 Apellido(s</td>
                                <td colspan="2" class="bold">5.3 C.I.N°</td>
                            </tr>
                            <tr>
                                <td colspan="2">Rafael Ramon</td>
                                <td colspan="2">Urbaneja Galindo</td>
                                <td colspan="2">14525363</td>
                            </tr>
                            <tr>
                                <td colspan="2" class="bold">5.4 Cargo :</td>
                                <td colspan="2" class="bold">5.5 Telefono:</td>
                                <td colspan="2" class="bold">5.6 Email:</td>
                            </tr>
                            <tr>
                                <td colspan="2">Coordinador</td>
                                <td colspan="2">0424-152-36-98</td>
                                <td colspan="2">coordinador@conapdis.com</td>
                            </tr>
                            <tr>
                                <td class=" bold" colspan="2">a.	Nombre (s):</td>
                                <td  colspan="2"  class=" bold">b.	Apellido (s):</td>
                                <td  colspan="2"  class=" bold">c.	C. I. N°:</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">6. DE LA CLASIFICACIÓN DE LA EDIFICACIÓN SEGÚN EL TIPO DE OCUPACIÓN</th>
                            </tr>
                            <tr>
                                <td class="bold">6.1. Comercial:</td>
                                <td class="bold">6.2. Industrial:</td>
                                <td class="bold">6.3. Oficinas:</td>
                                <td class="bold">6.4. Educacional:</td>
                                <td class="bold">6.5. Recreativo:</td>
                            </tr>
                            <tr>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                            </tr>
                            <tr>
                                <td class="bold">6.6. Asistencial:</td>
                                <td class="bold">6.7. Alojamioento Turístico:</td>
                                <td class="bold">6.8. Sitio de Reunión:</td>
                                <td class="bold">6.9. Estacionamiento para vehículos:</td>
                                <td class="bold">6.10.Otros:</td>
                            </tr>
                            <tr>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                                <td>xxxxx</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">7. DEL CUMPLIMIENTO DE LAS NORMAS Y REGLAMENTACIONES TÉCNICAS DE ACCESIBILIDAD:</th>
                            </tr>
                            <tr>
                                <td colspan="5">En acatamiento a lo establecido en el artículo 81 de la Constitución de la República Bolivariana de Venezuela de 1999; 
                                    concatenado con los artículos 3 literales “b” y “f” artículo 4 literal “e” artículo 5 numeral 2 y el artículo 9 numeral 
                                    1 literal “a” y numeral 2 literales “a”, “b” y “d” de la Convención Sobre los Derechos de las Personas con Discapacidad 
                                    del 13/12/2006; y, con los artículos: 4, 31, 32 y 35 de la Ley para las Personas con Discapacidad del 05/01/2007; Se deja 
                                    constancia que inspectores adscritos a la Gerencia de Fiscalización del Consejo Nacional para las Personas con Discapacidad 
                                    (CONAPDIS), practicaron una inspección técnica especializada en la edificación privada de uso público, entidad de trabajo 
                                    o razón social más arriba identificada en renglón correspondiente N° 2; A los fines de verificar el cumplimiento de las 
                                    normas y reglamentaciones técnicas en materia de accesibilidad establecidas en la Norma Técnica FONDONORMA (NTF) 2733 
                                    “Principios Generales para el Diseño, Proyecto, Construcción, Remodelación y Adecuación de Edificaciones para evitar las 
                                    Barreras Físicas y que dichos espacios sean completamente Accesible y Transitable con Autonomía, Comodidad y Seguridad 
                                    por las Personas”; y, según consta en guía de inspección técnica referida más arriba en renglón correspondiente 
                                    N° 3: 2.4 y 2.5 y después de ordenarse la reparación según boleta de ordenamiento referida más arriba en renglón 
                                    correspondiente N° 3: 3.6 y 3.7 y, subsanadas las fallas que fueron identificadas durante el desarrollo de la inspección 
                                    técnica especializada; Se pudo comprobar, por parte entidad de trabajo o razón social más arriba identificada en renglón 
                                    correspondiente N° 2; el cumplimiento de las normas y reglamentaciones técnicas en materia de accesibilidad contenidas 
                                    en la norma venezolana NTF FONDONORMA 2733 y demás referencias normativas nacionales que contienen disposiciones que al 
                                    ser citadas constituyen requisitos de esta norma venezolana (NTF FONDONORMA 2733), así como de las referencias de normativas 
                                    y reglamentaciones técnicas del Instituto Uruguayo de Normas Técnicas (UNIT) en materia de Accesibilidad al Medio Físico, 
                                    que son objeto de consulta hasta tanto sea publicada la Norma Venezolana Correspondiente.<br><br>
                                    La presente acta es válida única y exclusivamente ante esta Institución (CONAPDIS), por cuanto forma parte 
                                    del proceso de tramitación del “Certificado de Cumplimiento ABI”; No es válida para realizar trámites administrativos 
                                    ante otros Organismos o Entes del Estado; Para tales fines, el documento que se debe exigir es el “Certificado de Cumplimiento ABI” 
                                    que es el documento definitivo expedido por el CONAPDIS, válido por un año.
                                </td>
                         
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5">8. DE LAS FIRMAS DEL INSPECTOR ACTUANTE Y DE LA  ENTIDAD DE TRABAJO O RAZÓN SOCIAL</th>
                            </tr>
                            <tr>
                                <td colspan="2"  class=" bold">8.1 Nombre(s)</td>
                                <td  class=" bold">8.2 Apellido(s)</td>
                                <td  class=" bold">8.3 C.I.N°</td>
                                <td  class=" bold">8.4 Providencia</td>
                            </tr>
                            <tr>
                                <td colspan="2">Juan José</td>
                                <td>Perez Perez</td>
                                <td>20222111</td>
                                <td>Administrativa 2514</td>
                            </tr>
                            
                            <tr>
                                <td colspan="2" class="bold">8.5	Firma del Representate Legal:</td>
                                <td colspan="2" class="bold">8.6 Firma del Inspector</td>
                                <td colspan="2" class="bold">8.7 Sello Troquelado</td>
                            </tr>
                            <tr>
                                <td colspan="2" rowspan="4">xxxxxxxxx</td>
                                <td colspan="2" rowspan="4">xxxxxxxxxx</td>
                                <td colspan="2" rowspan="4">xxxxxxxxxx</td>
                              
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
 import compliancesModule            from '@/store/modules/compliancesModule';
  
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

    methods: {
        generateReport () {
            this.btn_atras = false
            this.$refs.html2Pdf.generatePdf()
        },
        onProgress(event){
            //console.log(event)
        },
        async getCompliancesById(id){
            const {data} = await compliancesModule.getCompliancesById(id);
            console.log(data)
        },
        formatofecha(fecha) {
            var date = new Date(fecha);
            let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
            return  formatted_date;
        }
    },
    mounted(){
    this.nota_entrega_id = this.$route.params.id
    this.notification = 'Notification ' + this.nota_entrega_id
    this.getCompliancesById(this.nota_entrega_id)
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

 
  
 

