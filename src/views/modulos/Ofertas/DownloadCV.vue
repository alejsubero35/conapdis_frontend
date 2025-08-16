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
                        <h3>{{ fullname.toUpperCase() }}</h3>
                        <h3>{{ cedula }}</h3>
                         <h3>Teléfonos : {{ telefono_1 }} / {{ telefono_2 }}</h3>
                    </div><br>
                    <v-row class="table">
                        <table>
                            <tr>
                                <td colspan="2" >Fecha de Nacimiento : <strong>{{ fecha_nac }}</strong> </td>
                                <td>Edad : <strong>{{ edad }}</strong></td>
                                <td>Sexo : <strong>{{ sexo }}</strong></td>
                                <td >Profesión :<strong>{{ profesion }}</strong> </td>
                            </tr>
                            <tr>
                                <td colspan="2" >Grado de Instrucción: <strong>{{ nivel }}</strong> </td>
                                <td>N° Certificado : <strong>{{ certificado }}</strong></td>
                                <td colspan="4">Dirección : <strong>{{ direccion }}</strong></td>
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
                                <td style="text-align:center">{{ nivel }} </td>
                                <td style="text-align:center">{{ carrera }} </td>
                                <td style="text-align:center">{{ instituto }} </td>
                                <td style="text-align:center">{{ culminacion }} </td>
                                <td style="text-align:center">{{ condicion }} </td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>DATOS LABORALES</h3></th>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:center"><strong>Empresa</strong> </td>
                                <td style="text-align:center"><strong>Cargo</strong></td>
                                <td style="text-align:center"><strong>Inicio</strong></td>
                                <td style="text-align:center"><strong>Fin</strong></td>
                            </tr>
                               <tr>
                                <td  colspan="2"  style="text-align:center">{{ empresatrabaja }}</td>
                                <td style="text-align:center">{{ cargo }}</td>
                                <td style="text-align:center">{{ inicio }}</td>
                                <td style="text-align:center">{{ fin }}</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>IDIOMAS</h3></th>
                            </tr>
                            <tr>
                                <td colspan="3" style="text-align:center"><strong>Idioma</strong></td>
                                <td colspan="2" style="text-align:center"><strong>Nivel</strong></td>
                            </tr>
                               <tr>
                                <td  colspan="3"  style="text-align:center">{{ idioma }}</td>
                                <td  colspan="2" style="text-align:center">{{ nivelidioma }}</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>HABILIDADES Y DESTREZAS</h3></th>
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align:center">{{ habilidades }}</td>
                            </tr>
                        <!--     <tr>
                                <th class="td-center" colspan="5"><h3>DISCAPACIDAD</h3></th>
                            </tr>
                            <tr>
                                <td colspan="5" style="text-align:center">{{ razonsocial }} </td>
                            </tr> -->
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
import ofertModule from '@/store/modules/ofertModule';
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
            position: '',
            identitycard: '',
            phone: '',
            email: '',
            nivel:'',
            carrera:'',
            instituto:'',
            culminacion:'',
            condicion:'',
            fullname:'',
            cedula:'',
            telefono_1:'',
            telefono_2:'',
            fecha_nac:'',
            edad:'',
            sexo:'',
            profesion:'',
            certificado:'',
            direccion:'',
            empresatrabaja:'',
            cargo:'',
            inicio:'',
            fin:'',
            idioma:'',
            nivelidioma:'',
            habilidades:'',

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
         // Calcula edad a partir de una fecha (ISO o DD/MM/YYYY)
         calculateAge(fecha) {
            if (!fecha) return ''
            let birth
            if (typeof fecha === 'string' && fecha.includes('/')) {
                const [dd, mm, yyyy] = fecha.split('/')
                birth = new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10))
            } else {
                birth = new Date(fecha)
            }
            if (isNaN(birth.getTime())) return ''
            const today = new Date()
            let age = today.getFullYear() - birth.getFullYear()
            const m = today.getMonth() - birth.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--
            }
            return age
         },
      async getDataCV(id){  
            this.overlay = true
            const data = await ofertModule.getDataCV(id)  
            console.log(data)
            if(data.status == 200){
          const p = data.data.postulaPcd || {}
          const fa = data.data.formacion_academica || {}
          const lab = data.data.laborales || {}
          const idi = data.data.idiomas || {}
          const pdc = data.data.pdc || {}

          this.fullname       = [p.nombres_postula_pcd, p.apellidos_postula_pcd].filter(Boolean).join(' ')
          this.cedula         = p.cedula_postula_pcd || ''
          this.telefono_1     = p.telefono1_postula_pcd || ''
          this.telefono_2     = p.telefono2_postula_pcd || ''
                this.fecha_nac      = p.fecha_nacimiento_postula_pcd || ''
                this.edad           = this.calculateAge(this.fecha_nac)
          this.certificado    = pdc.numero_certificado || ''
          this.direccion      = p.direccion_postula_pcd || ''
          this.sexo           = p.nombre || ''
          this.profesion      = p.desc_profesion_postula || ''
          this.nivel          = fa.desc_grado_instruccion_postula || ''
          this.carrera        = fa.desc_carrera_postula || ''
          this.instituto      = fa.instituto_postula_pcd_laboral || ''
          this.culminacion    = fa.ano_culminacion_postula_pcd_laboral || ''
          this.condicion      = fa.desc_condicion_postula || ''
          this.empresatrabaja = lab.empresa_postula_pcd_laboral || ''
          this.cargo          = lab.cargo_postula_pcd_laboral || ''
          this.inicio         = lab.fecha_postula_desde || ''
          this.fin            = lab.fecha_postula_hasta || ''
          this.idioma         = idi.desc_idioma_postula || ''
          this.nivelidioma    = idi.desc_nivel_postula || ''
          this.habilidades    = p.habilidades_postula_pcd || ''
                this.overlay = false
            } 
   
        }
     },
     mounted(){
        this.nota_entrega_id = this.$route.params.id
        this.notification = 'CV ' + this.nota_entrega_id
        this.getDataCV(this.$route.params.id)
        this.currentUser = storageData.get('_User');
        

     }
        ,
        // Calcula la edad desde una fecha (acepta ISO o DD/MM/YYYY)
        calculateAge(fecha) {
            if (!fecha) return ''
            let birth
            if (typeof fecha === 'string' && fecha.includes('/')) {
                const [dd, mm, yyyy] = fecha.split('/')
                birth = new Date(parseInt(yyyy, 10), parseInt(mm, 10) - 1, parseInt(dd, 10))
            } else {
                birth = new Date(fecha)
            }
            if (isNaN(birth.getTime())) return ''
            const today = new Date()
            let age = today.getFullYear() - birth.getFullYear()
            const m = today.getMonth() - birth.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
                age--
            }
            return age
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

 
  
 

