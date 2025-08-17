<template>
    <div>
        <v-overlay :value="overlay">
            <v-progress-circular indeterminate size="64" class="laoding"></v-progress-circular>
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
            <section slot="pdf-content">
                <div class="form_contacto">
                    <div class="text-center"><h1>CURRICULUM VITAE</h1></div>
                    <div class="logo">
                        <img
                            :src="photoSrc"
                            @error="onPhotoError"
                            style="object-fit: cover;width:150px"
                            alt="Foto PCD"
                        />
                        <div class="td-center" style="width:100%; margin-top: 6px;">
                            Certificado N°: <strong>{{ certificado }}</strong>
                        </div>
                    </div><br>
                    <div class="td-center">
                        <h3>{{ fullname.toUpperCase() }}</h3>
                        <h3>{{ cedula }}</h3>
                        <h3>Teléfonos : {{ telefono_1 }} / {{ telefono_2 }}</h3>
                    </div><br>
                    <v-row class="table">
                        <table>
                            <tr>
                                <td colspan="2">Fecha de Nacimiento : <strong>{{ fecha_nac }}</strong></td>
                                <td>Edad : <strong>{{ edad }}</strong></td>
                                <td>Sexo : <strong>{{ sexo }}</strong></td>
                                <td>Profesión : <strong>{{ profesion }}</strong></td>
                            </tr>
                            <tr>
                                <td colspan="2">Grado de Instrucción: <strong>{{ nivel }}</strong></td>
                                <td>N° Certificado : <strong>{{ certificado }}</strong></td>
                                <td colspan="4">Dirección : <strong>{{ direccion }}</strong></td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>FORMACIÓN ACADÉMICA</h3></th>
                            </tr>
                            <tr>
                                <td style="text-align:center"><strong>Nivel </strong>{{ razonsocial }}</td>
                                <td style="text-align:center"><strong>Carrera </strong>{{ rif }}</td>
                                <td style="text-align:center"><strong>Instituto</strong>{{ rif }}</td>
                                <td style="text-align:center"><strong>Culminación</strong>{{ rif }}</td>
                                <td style="text-align:center"><strong>condición</strong>{{ rif }}</td>
                            </tr>
                            <tr>
                                <td style="text-align:center">{{ nivel }}</td>
                                <td style="text-align:center">{{ carrera }}</td>
                                <td style="text-align:center">{{ instituto }}</td>
                                <td style="text-align:center">{{ culminacion }}</td>
                                <td style="text-align:center">{{ condicion }}</td>
                            </tr>
                            <tr>
                                <th class="td-center" colspan="5"><h3>DATOS LABORALES</h3></th>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:center"><strong>Empresa</strong></td>
                                <td style="text-align:center"><strong>Cargo</strong></td>
                                <td style="text-align:center"><strong>Inicio</strong></td>
                                <td style="text-align:center"><strong>Fin</strong></td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align:center">{{ empresatrabaja }}</td>
                                <td style="text-align:center">{{ cargo }}</td>
                                <td style="text-align:center">{{ inicio }}</td>
                                <td style="text-align:center">{{ fin }}</td>
                            </tr>
                            <!--  <tr>
                                <th class="td-center" colspan="5"><h3>IDIOMAS</h3></th>
                            </tr>
                            <tr>
                                <td colspan="3" style="text-align:center"><strong>Idioma</strong></td>
                                <td colspan="2" style="text-align:center"><strong>Nivel</strong></td>
                            </tr>
                            <tr>
                                <td colspan="3" style="text-align:center">{{ idioma }}</td>
                                <td colspan="2" style="text-align:center">{{ nivelidioma }}</td>
                            </tr> -->
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
                                <td colspan="5" style="text-align:center">{{ razonsocial }}</td>
                            </tr> -->
                        </table>
                    </v-row>
                    <div class="mt-5 d-flex justify-end ">
                        <v-btn small @click="generateReport" color="success" v-show="btn_atras">{{ btnSave }}</v-btn>
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
             // internal image handling
             avatarPath: 'img/logos_conapdis/avatar.png',
             actualPhoto: '',
         }
     },
     computed: {
         photoSrc(){
             return this.actualPhoto || this.avatarPath
         }
     },
     methods: {
         generateReport () {
             this.btn_atras = false
             this.$refs.html2Pdf.generatePdf()
         },
         onPhotoError(e){
             // fallback to avatar if broken
             e.target.src = this.avatarPath
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
            console.log(data.data.postulaPcd)
            if(data.status == 200){
                const p = data.data.postulaPcd || {}
                const fa = data.data.formacion_academica || {}
                const lab = data.data.laborales || {}
                const idi = data.data.idiomas || {}
                const pdc = data.data.pdc || {}

          // set photo if provided
          this.actualPhoto   = pdc.url_foto || ''

          // Nombre completo preferiblemente desde la postulación; fallback a datos personales
          const nombrePostulacion = [p.nombres_postula_pcd, p.apellidos_postula_pcd].filter(Boolean).join(' ')
          const nombrePersona = [pdc.nombres, pdc.apellidos].filter(Boolean).join(' ')
          this.fullname       = nombrePostulacion || nombrePersona || ''

          // Identificación y contacto con fallback
          this.cedula         = p.cedula_postula_pcd || pdc.cedula || ''
          this.telefono_1     = p.telefono1_postula_pcd || pdc.telefono1 || ''
          this.telefono_2     = p.telefono2_postula_pcd || pdc.telefono2 || ''

          // Fecha de nacimiento y edad
          this.fecha_nac      = p.fecha_nacimiento_postula_pcd || pdc.fecha_nacimiento || ''
          this.edad           = this.calculateAge(this.fecha_nac)

          // Certificado y dirección (si no hay dirección de postulación, armar desde pdc)
          this.certificado    = pdc.numero_certificado || ''
          this.direccion      = p.direccion_postula_pcd || this.formatDireccion(pdc) || ''

          // Sexo: preferir pdc.sexo_nombre; fallback al alias genérico "nombre" de la primera consulta
          this.sexo           = pdc.sexo_nombre || p.nombre || ''
          this.profesion      = p.desc_profesion_postula || ''

          // Formación académica: usar campos de formacion_academica con fallback a los previos si existieran
          this.nivel          = fa.nivel || p.desc_grado_instruccion_postula || ''
          this.carrera        = fa.carrera || ''
          this.instituto      = fa.instituto || ''
          this.culminacion    = fa.culminacion || ''
          this.condicion      = fa.condicion || ''

          // Datos laborales con nuevos nombres
          this.empresatrabaja = lab.empresa_laboral || ''
          this.cargo          = lab.cargo_laboral || ''
          this.inicio         = lab.fecha_ingreso || ''
          this.fin            = lab.fecha_egreso || ''

          // Idiomas si en algún momento se agregan; mantener seguros
          this.idioma         = (idi && idi.desc_idioma_postula) || ''
          this.nivelidioma    = (idi && idi.desc_nivel_postula) || ''
          this.habilidades    = p.habilidades_postula_pcd || ''
                this.overlay = false
            } 
   
        },
        formatDireccion(pdc) {
            if (!pdc) return ''
            const parts = [
                pdc.estado_nombre,
                pdc.municipio_nombre,
                pdc.parroquia_nombre,
                pdc.sector_nombre,
                pdc.av_o_calle,
                pdc.edif_o_casa
            ].filter(Boolean)
            return parts.join(', ')
        }
     },
     mounted(){
        this.nota_entrega_id = this.$route.params.id
        this.notification = 'CV ' + this.nota_entrega_id
        this.getDataCV(this.$route.params.id)
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





